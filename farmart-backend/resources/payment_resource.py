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