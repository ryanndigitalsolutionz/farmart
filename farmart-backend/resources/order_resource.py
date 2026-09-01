from flask import session
from flask_restful import Resource

from models import db, Order, OrderStatus
from schemas.order_schema import OrderSchema

order_schema = OrderSchema()
orders_schema = OrderSchema(many=True)

class OrderResource(Resource):
    
    def get(self, order_id=None):
        buyer_id = session.get("user_id")
        
        if not buyer_id:
            return {"message": "Authorized required"}, 401

        if session.get("user_role") != "buyer":
            return {"message": "Buyer access required"}, 403
        
        if order_id:
            order = db.session.get(Order, order_id)

            if not order:
                return {"message": "Order not found"}, 404

            if order.buyer_id != buyer_id:
                return {"message": "Access denied"}, 403

            return order_schema.dump(order), 200

        orders = Order.query.filter_by(buyer_id=buyer_id).all()
        
        return order_schema.dump(orders), 200

    