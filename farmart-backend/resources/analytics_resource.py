from collections import defaultdict
from decimal import Decimal

from flask import session
from flask_restful import Resource
from sqlalchemy import func

from extensions import db
from models import (
    Analytics,
    Livestock,
    Order,
    OrderItem,
    Product,
)
from models.order import OrderStatus
from schemas.analytics_schema import AnalyticsSchema

analytics_schema = AnalyticsSchema()


def _status_value(status):
    if hasattr(status, "value"):
        return status.value

    return str(status)


class AnalyticsResource(Resource):

    def get(self):
        farmer_id = session.get("user_id")

        if not farmer_id:
            return {
                "message": "Authorization required"
            }, 401

        if session.get("user_role") != "farmer":
            return {
                "message": "Farmer access required"
            }, 403

        livestock_count = (
            Livestock.query
            .filter_by(farmer_id=farmer_id)
            .count()
        )

        product_count = (
            Product.query
            .filter_by(farmer_id=farmer_id)
            .count()
        )

        total_listings = (
            livestock_count +
            product_count
        )

        order_items = (
            OrderItem.query
            .outerjoin(Livestock)
            .outerjoin(Product)
            .filter(
                db.or_(
                    Livestock.farmer_id == farmer_id,
                    Product.farmer_id == farmer_id,
                )
            )
            .all()
        )

        order_groups = {}

        for item in order_items:
            order = item.order

            if order.id not in order_groups:
                order_groups[order.id] = {
                    "order": order,
                    "items": [],
                }

            order_groups[order.id]["items"].append(item)

        completed_orders = []
        revenue_by_date = defaultdict(
            lambda: Decimal("0.00")
        )
        sales_by_date = defaultdict(int)
        category_counts = defaultdict(int)
        status_counts = defaultdict(int)

        total_sales = 0
        total_revenue = Decimal("0.00")

        for group in order_groups.values():
            order = group["order"]
            items = group["items"]

            status = _status_value(order.status)
            status_counts[status] += 1

            farmer_order_revenue = Decimal("0.00")
            farmer_order_quantity = 0

            for item in items:
                quantity = int(item.quantity or 0)

                farmer_order_quantity += quantity

                if status == OrderStatus.COMPLETED.value:
                    total_sales += quantity
                    farmer_order_revenue += Decimal(
                        str(item.subtotal)
                    )

                    if item.livestock:
                        category_counts[
                            item.livestock.type
                        ] += quantity

                    if item.product:
                        category_counts[
                            item.product.type
                        ] += quantity

            if (
                status == OrderStatus.COMPLETED.value
                and farmer_order_quantity > 0
            ):
                total_revenue += farmer_order_revenue

                date_key = (
                    order.created_at.strftime("%Y-%m-%d")
                    if order.created_at
                    else "Unknown"
                )

                revenue_by_date[
                    date_key
                ] += farmer_order_revenue

                sales_by_date[
                    date_key
                ] += farmer_order_quantity

                completed_orders.append(order)

        analytics = Analytics.query.filter_by(
            farmer_id=farmer_id
        ).first()

        if not analytics:
            analytics = Analytics(
                farmer_id=farmer_id,
            )
            db.session.add(analytics)

        analytics.total_listings = total_listings
        analytics.total_sales = total_sales
        analytics.total_revenue = total_revenue

        db.session.commit()

        revenue_data = [
            {
                "date": date,
                "revenue": float(amount),
            }
            for date, amount
            in sorted(revenue_by_date.items())
        ]

        sales_data = [
            {
                "date": date,
                "quantity": quantity,
            }
            for date, quantity
            in sorted(sales_by_date.items())
        ]

        category_data = [
            {
                "name": name,
                "value": value,
            }
            for name, value
            in sorted(
                category_counts.items(),
                key=lambda item: item[1],
                reverse=True,
            )
        ]

        order_status_data = [
            {
                "name": status,
                "value": value,
            }
            for status, value
            in sorted(
                status_counts.items(),
                key=lambda item: item[0],
            )
        ]

        return {
            "analytics": analytics_schema.dump(
                analytics
            ),
            "revenue_data": revenue_data,
            "sales_data": sales_data,
            "category_data": category_data,
            "order_status_data": order_status_data,
        }, 200
