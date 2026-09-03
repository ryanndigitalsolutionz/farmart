import os

from flask import Flask
from flask_restful import Api

from config import Config
from extensions import db, ma, migrate, bcrypt, cors

from resources.revenue_record_resource import RevenueRecordResource

from models import (
    User,
    Profile,
    Livestock,
    Order,
    OrderItem,
    Payment,
    Report,
    Review,
    Wishlist,
    Announcement,
)

from resources.auth_resource import auth_bp
from resources.google_callback_resource import google_callback_bp
from resources.announcement_resource import AnnouncementListResource, AnnouncementResource
from resources.report_resource import ReportListResource, ReportResource
from resources.user_resource import UserListResource, UserResource
from resources.order_resource import OrderResource
from resources.payment_resource import PaymentResource, MpesaCallbackResource
from resources.farmer_resource import FarmerListResource, FarmerResource
from resources.livestock_resource import LivestockResource
from resources.product_resource import ProductResource
from resources.order_item_resource import OrderItemsResource
from resources.review_resource import ReviewResource
from resources.wishlist_resource import WishlistResource


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)

    cors.init_app(
        app,
        origins=[
            "http://localhost:5173",
            "http://127.0.0.1:5173",
        ],
        supports_credentials=True,
    )

    api = Api(app)

    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(google_callback_bp, url_prefix="/auth")

    api.add_resource(
        RevenueRecordResource,
        "/api/revenue",
        "/api/revenue/<int:revenue_id>",
    )

    api.add_resource(
        AnnouncementListResource,
        "/api/announcements",
    )
    api.add_resource(
        AnnouncementResource,
        "/api/announcements/<int:announcement_id>",
    )
    api.add_resource(
        ReportListResource,
        "/api/reports",
    )
    api.add_resource(
        ReportResource,
        "/api/reports/<int:report_id>",
    )
    api.add_resource(
        UserListResource,
        "/api/users",
    )
    api.add_resource(
        UserResource,
        "/api/users/<int:user_id>",
    )
    api.add_resource(
        FarmerListResource,
        "/api/farmers",
    )
    api.add_resource(
        FarmerResource,
        "/api/farmers/<int:user_id>",
    )

    api.add_resource(
        LivestockResource,
        "/livestock",
        "/livestock/<int:livestock_id>",
    )
    api.add_resource(
        ProductResource,
        "/products",
        "/products/<int:product_id>",
    )
    api.add_resource(
        WishlistResource,
        "/wishlist",
        "/wishlist/<int:wishlist_id>",
    )
    api.add_resource(
        ReviewResource,
        "/reviews",
        "/reviews/<int:review_id>",
    )
    api.add_resource(
        OrderResource,
        "/orders",
        "/orders/<int:order_id>",
    )
    api.add_resource(
        OrderItemsResource,
        "/order-items",
        "/order-items/<int:item_id>",
    )
    api.add_resource(
        PaymentResource,
        "/payments",
        "/payments/<int:payment_id>",
    )
    api.add_resource(
        MpesaCallbackResource,
        "/payments/mpesa/callback",
    )

    return app


app = create_app()

if __name__ == "__main__":
    app.run(
        debug=False,
        host="0.0.0.0",
        port=int(os.getenv("PORT", 5000)),
    )
