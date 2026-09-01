from flask import session
from flask_restful import Resource

from models import db, OrderItem, Order
from schemas.order_item_schema import OrderItemSchema

order_item_schema = OrderItemSchema()
order_items_schema = OrderItemSchema(many=True)

class OrderItemsResource(Resource):
    def get(self, item_id=None):
        buyer_id = session.get("user_id")

        if not buyer_id:
            return {"message": "Authorization required"}, 401

        if session.get("user_role") != "buyer":
            return {"message": "Buyer access required"}, 403

        if item_id:
            item = db.session.get(OrderItem, item_id)

            if not item:
                return {"message": "Order item not found"}, 404

            if item.order.buyer_id != buyer_id:
                return {"message": "Access denied"}, 403

            return order_item_schema.dump(item), 200

        items = (
            OrderItem.query
            .join(Order)
            .filter(Order.buyer_id == buyer_id)
            .all()
        )

        return order_items_schema.dump(items), 200

    