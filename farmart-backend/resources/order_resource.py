from flask import request
from flask_restful import Resource
from models import db, Order, OrderStatus
from schemas.order_schema import OrderSchema

order_schema = OrderSchema()
orders_schema = OrderSchema(many=True)


class OrderResource(Resource):

    def get(self, order_id=None):
        if order_id:
            order = db.session.get(Order, order_id)
            if not order:
                return {"message": "Order not found"}, 404
            return order_schema.dump(order), 200

        orders = Order.query.all()
        return orders_schema.dump(orders), 200

    def post(self):
        data = request.get_json() or {}

        buyer_id = data.get("buyer_id")
        total_amount = data.get("total_amount")
        status = data.get("status", "pending")

        if not buyer_id or total_amount is None:
            return {
                "message": "buyer_id and total_amount are required."
            }, 400

        order = Order(
            buyer_id=buyer_id,
            total_amount=total_amount,
            status=OrderStatus(status),
        )
        db.session.add(order)
        db.session.commit()

        return order_schema.dump(order), 201