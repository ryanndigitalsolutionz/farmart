from flask import request
from flask_restful import Resource
from models import db, Payment
from schemas.payment_schema import PaymentSchema

payment_schema = PaymentSchema()
payments_schema = PaymentSchema(many=True)


class PaymentResource(Resource):

    def get(self, payment_id=None):
        if payment_id:
            payment = db.session.get(Payment, payment_id)
            if not payment:
                return {"message": "Payment not found"}, 404
            return payment_schema.dump(payment), 200

        payments = Payment.query.all()
        return payments_schema.dump(payments), 200

    def post(self):
        data = request.get_json() or {}

        order_id = data.get("order_id")
        amount = data.get("amount")
        method = data.get("method")
        status = data.get("status", "pending")
        transaction_id = data.get("transaction_id")

        if not order_id or amount is None or not method or not transaction_id:
            return {
                "message": "order_id, amount, method, and transaction_id are required."
            }, 400

        from models import PaymentMethod, PaymentStatus

        payment = Payment(
            order_id=order_id,
            amount=amount,
            method=PaymentMethod(method),
            status=PaymentStatus(status),
            transaction_id=transaction_id,
        )
        db.session.add(payment)
        db.session.commit()

        return payment_schema.dump(payment), 201