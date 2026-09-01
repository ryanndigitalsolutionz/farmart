from flask import session
from flask_restful import Resource

from models import db, Payment, Order
from schemas.payment_schema import PaymentSchema

payment_schema = PaymentSchema()
payments_schema = PaymentSchema(many=True)

class PaymentResource(Resource):

    def get(self, payment_id=None):
        buyer_id = session.get("user_id")

        if not buyer_id:
            return {"message": "Authorized required"}, 401

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