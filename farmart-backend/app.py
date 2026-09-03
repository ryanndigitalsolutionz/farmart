from flask import Flask
from config import Config
from extensions import db, ma, migrate, bcrypt, cors, api
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
from resources.payment_resource import PaymentResource
from resources.farmer_resource import FarmerListResource, FarmerResource

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    cors.init_app(app)

    api.add_resource(AnnouncementListResource, "/api/announcements")
    api.add_resource(AnnouncementResource, "/api/announcements/<int:announcement_id>")
    api.add_resource(ReportListResource, "/api/reports")
    api.add_resource(ReportResource, "/api/reports/<int:report_id>")
    api.add_resource(UserListResource, "/api/users")
    api.add_resource(UserResource, "/api/users/<int:user_id>")
    api.add_resource(OrderResource, "/api/orders", "/api/orders/<int:order_id>")
    api.add_resource(PaymentResource, "/api/payments", "/api/payments/<int:payment_id>")
    api.add_resource(FarmerListResource, "/api/farmers")
    api.add_resource(FarmerResource, "/api/farmers/<int:user_id>")
    api.init_app(app)

    app.register_blueprint(
        auth_bp,
        url_prefix="/auth",
    )
    app.register_blueprint(
        google_callback_bp,
        url_prefix="/auth",
    )

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True)