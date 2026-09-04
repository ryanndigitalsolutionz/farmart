from decimal import Decimal

from flask import request, session
from flask_restful import Resource

from extensions import db
from models import Order, OrderItem, Livestock, Product
from models.order import OrderStatus
from schemas.order_schema import OrderSchema

order_schema = OrderSchema()
orders_schema = OrderSchema(many=True)


def _status_value(status):
    if hasattr(status, "value"):
        return status.value
    return str(status)


def _buyer_data(order):
    if not order.buyer:
        return None

    return {
        "id": order.buyer.id,
        "first_name": order.buyer.first_name,
        "last_name": order.buyer.last_name,
        "name": (
            f"{order.buyer.first_name} "
            f"{order.buyer.last_name}"
        ).strip(),
    }


def _item_data(item):
    data = {
        "id": item.id,
        "livestock_id": item.livestock_id,
        "product_id": item.product_id,
        "quantity": item.quantity,
        "unit_price": str(item.unit_price),
        "subtotal": str(item.subtotal),
    }

    if item.livestock:
        data["livestock"] = {
            "id": item.livestock.id,
            "name": item.livestock.name,
        }

    if item.product:
        data["product"] = {
            "id": item.product.id,
            "name": item.product.name,
        }

    return data


class OrderResource(Resource):

    def get(self, order_id=None):
        user_id = session.get("user_id")
        role = session.get("user_role")

        if not user_id:
            return {
                "message": "Authorization required"
            }, 401

        if role == "buyer":
            if order_id:
                order = db.session.get(Order, order_id)

                if not order:
                    return {
                        "message": "Order not found"
                    }, 404

                if order.buyer_id != user_id:
                    return {
                        "message": "Access denied"
                    }, 403

                return order_schema.dump(order), 200

            orders = (
                Order.query
                .filter_by(buyer_id=user_id)
                .order_by(Order.created_at.desc())
                .all()
            )

            return orders_schema.dump(orders), 200

        if role == "farmer":
            if order_id:
                order = db.session.get(Order, order_id)

                if not order:
                    return {
                        "message": "Order not found"
                    }, 404

                farmer_items = [
                    item
                    for item in order.items
                    if (
                        item.livestock
                        and item.livestock.farmer_id == user_id
                    )
                    or (
                        item.product
                        and item.product.farmer_id == user_id
                    )
                ]

                if not farmer_items:
                    return {
                        "message": "Access denied"
                    }, 403

                farmer_amount = sum(
                    (
                        Decimal(str(item.subtotal))
                        for item in farmer_items
                    ),
                    Decimal("0.00"),
                )

                return {
                    "id": order.id,
                    "buyer_id": order.buyer_id,
                    "buyer": _buyer_data(order),
                    "total_amount": str(farmer_amount),
                    "status": _status_value(order.status),
                    "created_at": (
                        order.created_at.isoformat()
                        if order.created_at
                        else None
                    ),
                    "items": [
                        _item_data(item)
                        for item in farmer_items
                    ],
                }, 200

            items = (
                OrderItem.query
                .outerjoin(Livestock)
                .outerjoin(Product)
                .filter(
                    db.or_(
                        Livestock.farmer_id == user_id,
                        Product.farmer_id == user_id,
                    )
                )
                .all()
            )

            orders = {}

            for item in items:
                order = item.order

                if order.id not in orders:
                    orders[order.id] = {
                        "id": order.id,
                        "buyer_id": order.buyer_id,
                        "buyer": _buyer_data(order),
                        "total_amount": Decimal("0.00"),
                        "status": _status_value(order.status),
                        "created_at": (
                            order.created_at.isoformat()
                            if order.created_at
                            else None
                        ),
                        "items": [],
                    }

                orders[order.id]["total_amount"] += Decimal(
                    str(item.subtotal)
                )

                orders[order.id]["items"].append(
                    _item_data(item)
                )

            farmer_orders = list(orders.values())

            for order in farmer_orders:
                order["total_amount"] = str(
                    order["total_amount"]
                )

            farmer_orders.sort(
                key=lambda order: order["created_at"] or "",
                reverse=True,
            )

            return farmer_orders, 200

        return {
            "message": "Access denied"
        }, 403

    def post(self):
        buyer_id = session.get("user_id")

        if not buyer_id:
            return {
                "message": "Authorization required"
            }, 401

        if session.get("user_role") != "buyer":
            return {
                "message": "Buyer access required"
            }, 403

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

    def patch(self, order_id):
        farmer_id = session.get("user_id")
        role = session.get("user_role")

        if not farmer_id:
            return {
                "message": "Authorization required"
            }, 401

        if role != "farmer":
            return {
                "message": "Farmer access required"
            }, 403

        order = db.session.get(Order, order_id)

        if not order:
            return {
                "message": "Order not found"
            }, 404

        farmer_items = [
            item
            for item in order.items
            if (
                item.livestock
                and item.livestock.farmer_id == farmer_id
            )
            or (
                item.product
                and item.product.farmer_id == farmer_id
            )
        ]

        if not farmer_items:
            return {
                "message": "Access denied"
            }, 403

        data = request.get_json() or {}

        action = data.get("action")
        requested_status = data.get("status")

        if action == "cancel":
            if order.status != OrderStatus.PENDING:
                return {
                    "message": (
                        "Only pending orders can be cancelled"
                    )
                }, 400

            order.status = OrderStatus.CANCELLED

        elif requested_status:
            normalized_status = str(
                requested_status
            ).strip().lower()

            status_map = {
                "pending": OrderStatus.PENDING,
                "confirmed": OrderStatus.CONFIRMED,
                "cancelled": OrderStatus.CANCELLED,
                "completed": OrderStatus.COMPLETED,
            }

            new_status = status_map.get(
                normalized_status
            )

            if not new_status:
                return {
                    "message": (
                        "Invalid order status"
                    )
                }, 400

            current_status = order.status

            if current_status == OrderStatus.CANCELLED:
                return {
                    "message": (
                        "Cancelled orders cannot be updated"
                    )
                }, 400

            if current_status == OrderStatus.COMPLETED:
                return {
                    "message": (
                        "Completed orders cannot be updated"
                    )
                }, 400

            if (
                current_status == OrderStatus.PENDING
                and new_status not in (
                    OrderStatus.CONFIRMED,
                    OrderStatus.CANCELLED,
                )
            ):
                return {
                    "message": (
                        "Pending orders can only be "
                        "confirmed or cancelled"
                    )
                }, 400

            if (
                current_status == OrderStatus.CONFIRMED
                and new_status != OrderStatus.COMPLETED
            ):
                return {
                    "message": (
                        "Confirmed orders can only be "
                        "completed"
                    )
                }, 400

            order.status = new_status

        else:
            return {
                "message": (
                    "Provide an action or status"
                )
            }, 400

        try:
            db.session.commit()

            return {
                "message": "Order updated successfully",
                "order": order_schema.dump(order),
                "status": _status_value(order.status),
            }, 200

        except Exception as error:
            db.session.rollback()

            return {
                "message": "Unable to update order",
                "error": str(error),
            }, 400
