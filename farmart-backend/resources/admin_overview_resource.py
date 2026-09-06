from datetime import datetime, timezone

from flask_restful import Resource

from models.livestock import Livestock
from models.payment import Payment, PaymentStatus
from models.product import Product
from models.user import User
from resources.auth_utils import require_admin
from resources.farmer_resource import _serialize_farmer


class AdminOverviewResource(Resource):
    def get(self):
        error = require_admin()
        if error:
            return error

        total_users = User.query.count()

        active_listings = (
            Livestock.query.filter(Livestock.quantity > 0).count()
            + Product.query.filter(Product.quantity > 0).count()
        )

        now = datetime.now(timezone.utc)
        month_start = now.replace(
            day=1, hour=0, minute=0, second=0, microsecond=0
        )

        gmv_this_month = sum(
            (
                float(payment.amount)
                for payment in Payment.query.filter(
                    Payment.status == PaymentStatus.COMPLETED,
                    Payment.paid_at >= month_start,
                ).all()
            ),
            0.0,
        )

        pending_farmers = User.query.filter_by(role="farmer").all()
        pending_farmers = [
            _serialize_farmer(f)
            for f in pending_farmers
            if f.profile and f.profile.verification_status == "pending"
        ]

        return {
            "total_users": total_users,
            "active_listings": active_listings,
            "gmv_this_month": gmv_this_month,
            "open_disputes": 0,
            "pending_farmers": pending_farmers,
        }, 200
