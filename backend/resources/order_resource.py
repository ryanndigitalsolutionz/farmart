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

        orders = order.query.all()

        return order_schema.dump(orders), 200

    