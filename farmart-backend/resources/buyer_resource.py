from flask_restful import Resource

from models.order import OrderStatus
from models.user import User
from resources.auth_utils import require_admin


def _serialize_buyer_summary(user):
    orders = user.orders
    total_spent = sum(
        (order.total_amount for order in orders if order.status != OrderStatus.CANCELLED),
        start=0,
    )

    return {
        "id": user.id,
        "user_id": user.id,
        "full_name": f"{user.first_name} {user.last_name}".strip(),
        "email": user.email,
        "is_active": user.is_active,
        "order_count": len(orders),
        "total_spent": float(total_spent),
        "joined_date": user.created_at.isoformat() if user.created_at else None,
    }


def _serialize_buyer_detail(user):
    profile = user.profile
    orders = sorted(user.orders, key=lambda order: order.created_at, reverse=True)
    total_spent = sum(
        (order.total_amount for order in orders if order.status != OrderStatus.CANCELLED),
        start=0,
    )

    return {
        "id": user.id,
        "user_id": user.id,
        "full_name": f"{user.first_name} {user.last_name}".strip(),
        "email": user.email,
        "delivery_location": profile.location if profile else None,
        "is_active": user.is_active,
        "joined_date": user.created_at.isoformat() if user.created_at else None,
        "order_count": len(orders),
        "total_spent": float(total_spent),
        "recent_orders": [
            {
                "id": order.id,
                "status": order.status.value,
                "total_amount": float(order.total_amount),
            }
            for order in orders[:5]
        ],
    }


class BuyerListResource(Resource):
    def get(self):
        error = require_admin()
        if error:
            return error

        buyers = User.query.filter_by(role="buyer").all()
        return [_serialize_buyer_summary(b) for b in buyers], 200


class BuyerResource(Resource):
    def get(self, user_id):
        error = require_admin()
        if error:
            return error

        user = User.query.filter_by(id=user_id, role="buyer").first()

        if not user:
            return {"message": "Buyer not found"}, 404

        return _serialize_buyer_detail(user), 200
