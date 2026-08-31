from flask import request
from flask_restful import Resource

from models import db, OrderItem
from schemas.order_item_schema import OrderItemSchema

order_item_schema = OrderItemSchema()
order_item_schema = OrderItemSchema(many=True)

class OrderItemsResource(Resource):
    def get(self, item_id=None):
        if item_id:
            item = db.session.get(OrderItem, item_id)

            if not item:
                return {"message": "Order item not found"}, 404

            return order_item_schema.dump(item), 200

        items = OrderItem.query.all()

        return order_item_schema.dump(items), 200

    