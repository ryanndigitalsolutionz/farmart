from decimal import Decimal

import requests
from flask import request, session
from flask_restful import Resource

from extensions import db
from models.payment import Payment, PaymentMethod, PaymentStatus
from models.order import Order, OrderStatus
from schemas.payment_schema import PaymentSchema
from services.mpesa_service import MpesaService


payment_schema = PaymentSchema()
payments_schema = PaymentSchema(many=True)


class PaymentResource(Resource):

    def get(self, payment_id=None):
        buyer_id = session.get("user_id")

        if not buyer_id:
            return {"message": "Authorization required"}, 401

        if session.get("user_role") != "buyer":
            return {"message": "Buyer access required"}, 403

        if payment_id:
            payment = db.session.get(Payment, payment_id)

            if not payment:
                return {"message": "Payment not found"}, 404

            if payment.order.buyer_id != buyer_id:
                return {"message": "Access denied"}, 403

            return payment_schema.dump(payment), 200

        payments = (
            Payment.query
            .join(Order)
            .filter(Order.buyer_id == buyer_id)
            .all()
        )

        return payments_schema.dump(payments), 200

    def post(self):
        buyer_id = session.get("user_id")

        if not buyer_id:
            return {"message": "Authorization required"}, 401

        if session.get("user_role") != "buyer":
            return {"message": "Buyer access required"}, 403

        data = request.get_json() or {}

        order_id = data.get("order_id")
        phone_number = data.get("phone_number")

        if not order_id:
            return {"message": "order_id is required"}, 400

        if not phone_number:
            return {"message": "phone_number is required"}, 400

        phone_number = str(phone_number).strip()

        if phone_number.startswith("+"):
            phone_number = phone_number[1:]

        if phone_number.startswith("07"):
            phone_number = "254" + phone_number[1:]
        elif phone_number.startswith("01"):
            phone_number = "254" + phone_number[1:]

        if not phone_number.isdigit() or len(phone_number) != 12:
            return {
                "message": "Enter a valid Kenyan M-Pesa phone number"
            }, 400

        order = db.session.get(Order, order_id)

        if not order:
            return {"message": "Order not found"}, 404

        if order.buyer_id != buyer_id:
            return {"message": "Access denied"}, 403

        if order.status != OrderStatus.PENDING:
            return {
                "message": "Order is not available for payment"
            }, 400

        try:
            amount = Decimal(str(order.total_amount))

            payment = Payment(
                order_id=order.id,
                amount=amount,
                method=PaymentMethod.MPESA,
                status=PaymentStatus.PENDING,
            )

            db.session.add(payment)
            db.session.flush()

            result = MpesaService.stk_push(
                phone_number=phone_number,
                amount=amount,
                account_reference=f"Farmart-{order.id}",
                transaction_desc=f"Farmart order {order.id}",
            )

            payment.merchant_request_id = result.get(
                "MerchantRequestID"
            )

            payment.checkout_request_id = result.get(
                "CheckoutRequestID"
            )

            db.session.commit()

            return {
                "message": result.get(
                    "CustomerMessage",
                    "STK Push sent successfully",
                ),
                "payment": payment_schema.dump(payment),
                "merchant_request_id": payment.merchant_request_id,
                "checkout_request_id": payment.checkout_request_id,
                "response_code": result.get("ResponseCode"),
                "response_description": result.get(
                    "ResponseDescription"
                ),
            }, 200

        except requests.RequestException as error:
            db.session.rollback()

            return {
                "message": "M-Pesa request failed",
                "error": str(error),
            }, 502

        except Exception as error:
            db.session.rollback()

            return {
                "message": "Unable to initiate M-Pesa payment",
                "error": str(error),
            }, 500


class MpesaCallbackResource(Resource):

    def post(self):
        data = request.get_json(silent=True) or {}

        stk_callback = (
            data.get("Body", {})
            .get("stkCallback", {})
        )

        checkout_request_id = stk_callback.get(
            "CheckoutRequestID"
        )

        if not checkout_request_id:
            return {
                "ResultCode": 1,
                "ResultDesc": "CheckoutRequestID missing",
            }, 400

        payment = Payment.query.filter_by(
            checkout_request_id=checkout_request_id
        ).first()

        if not payment:
            return {
                "ResultCode": 0,
                "ResultDesc": "Callback received",
            }, 200

        if payment.status == PaymentStatus.COMPLETED:
            return {
                "ResultCode": 0,
                "ResultDesc": "Payment already completed",
            }, 200

        result_code = stk_callback.get("ResultCode")

        if result_code == 0:
            callback_metadata = stk_callback.get(
                "CallbackMetadata",
                {},
            )

            items = callback_metadata.get("Item", [])

            metadata = {
                item.get("Name"): item.get("Value")
                for item in items
                if item.get("Name")
            }

            payment.status = PaymentStatus.COMPLETED

            receipt_number = metadata.get(
                "MpesaReceiptNumber"
            )

            if receipt_number:
                payment.transaction_id = str(receipt_number)

            payment.paid_at = datetime.now(timezone.utc)
            payment.order.status = OrderStatus.CONFIRMED

        else:
            payment.status = PaymentStatus.FAILED

        db.session.commit()

        return {
            "ResultCode": 0,
            "ResultDesc": "Callback processed successfully",
        }, 200
   