from decimal import Decimal

from flask import request
from flask_restful import Resource

from extensions import db
from models import Order, OrderItem, Livestock, Product
from models.order import OrderStatus
from resources.auth_utils import get_current_user
from schemas.order_schema import OrderSchema


order_schema = OrderSchema()
orders_schema = OrderSchema(many=True)


class OrderResource(Resource):
    def get(self, order_id=None):
        user = get_current_user()

        if not user:
            return {"message": "Authorization required"}, 401

        if user.role not in ("buyer", "admin"):
            return {"message": "Access denied"}, 403

        if order_id:
            order = db.session.get(Order, order_id)

            if not order:
                return {"message": "Order not found"}, 404

            if user.role != "admin" and order.buyer_id != user.id:
                return {"message": "Access denied"}, 403

            return order_schema.dump(order), 200

        if user.role == "admin":
            orders = Order.query.order_by(
                Order.created_at.desc()
            ).all()
        else:
            orders = (
                Order.query
                .filter_by(buyer_id=user.id)
                .order_by(Order.created_at.desc())
                .all()
            )

        return orders_schema.dump(orders), 200

    def post(self):
        user = get_current_user()

        if not user:
            return {"message": "Authorization required"}, 401

        if user.role != "buyer":
            return {"message": "Buyer access required"}, 403

        buyer_id = user.id

        data = request.get_json() or {}
        items = data.get("items")

        if not items or not isinstance(items, list):
            return {
                "message": "items must be a non-empty list"
            }, 400

        try:
            total_amount = Decimal("0.00")
            order_items = []

            for item in items:
                quantity = int(
                    item.get("quantity", 1)
                )

                if quantity < 1:
                    return {
                        "message": (
                            "Item quantity must be at least 1"
                        )
                    }, 400

                livestock_id = item.get("livestock_id")
                product_id = item.get("product_id")

                if bool(livestock_id) == bool(product_id):
                    return {
                        "message": (
                            "Each item must contain either "
                            "livestock_id or product_id"
                        )
                    }, 400

                if livestock_id:
                    livestock = db.session.get(
                        Livestock,
                        livestock_id,
                    )

                    if not livestock:
                        return {
                            "message": (
                                f"Livestock {livestock_id} "
                                "not found"
                            )
                        }, 404

                    price = Decimal(
                        str(livestock.price)
                    )

                    order_item = OrderItem(
                        livestock_id=livestock.id,
                        quantity=quantity,
                        unit_price=price,
                        subtotal=price * quantity,
                    )

                else:
                    product = db.session.get(
                        Product,
                        product_id,
                    )

                    if not product:
                        return {
                            "message": (
                                f"Product {product_id} "
                                "not found"
                            )
                        }, 404

                    price = Decimal(
                        str(product.price)
                    )

                    if Decimal(
                        str(product.quantity)
                    ) < quantity:
                        return {
                            "message": (
                                f"Insufficient quantity for "
                                f"product {product.id}"
                            )
                        }, 400

                    order_item = OrderItem(
                        product_id=product.id,
                        quantity=quantity,
                        unit_price=price,
                        subtotal=price * quantity,
                    )

                total_amount += order_item.subtotal
                order_items.append(order_item)

            order = Order(
                buyer_id=buyer_id,
                total_amount=total_amount,
                status=OrderStatus.PENDING,
            )

            db.session.add(order)
            db.session.flush()

            for order_item in order_items:
                order_item.order_id = order.id
                db.session.add(order_item)

            db.session.commit()

            return {
                "message": "Order created successfully",
                "order": order_schema.dump(order),
                "order_id": order.id,
            }, 201

        except Exception as error:
            db.session.rollback()

            return {
                "message": "Unable to create order",
                "error": str(error),
            }, 400
