from flask import Flask
from extensions import db, ma, migrate, bcrypt, cors, api
from config import Config


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    cors.init_app(app)

    with app.app_context():
        _import_models()
        db.create_all()

    register_resources()
    api.init_app(app)

    return app


def _import_models():
    try:
        from models.user import User
    except ImportError:
        pass
    try:
        from models.profile import Profile
    except ImportError:
        pass
    try:
        from models.livestock import Livestock
    except ImportError:
        pass
    try:
        from models.exchange_rate import ExchangeRate
    except ImportError:
        pass
    try:
        from models.order import Order
    except ImportError:
        pass
    try:
        from models.order_item import OrderItem
    except ImportError:
        pass
    try:
        from models.payment import Payment
    except ImportError:
        pass
    try:
        from models.wishlist import Wishlist
    except ImportError:
        pass
    try:
        from models.review import Review
    except ImportError:
        pass
    try:
        from models.announcement import Announcement
    except ImportError:
        pass
    try:
        from models.report import Report
    except ImportError:
        pass
    try:
        from models.revenue_record import RevenueRecord
    except ImportError:
        pass
    try:
        from models.earnings_record import EarningsRecord
    except ImportError:
        pass
    try:
        from models.analytics import Analytics
    except ImportError:
        pass


def register_resources():
    _register_resource('resources.auth_resource', 'AuthResource', '/api/auth/login')
    _register_resource('resources.auth_resource', 'GoogleCallbackResource', '/api/auth/google/callback')
    _register_resource('resources.user_resource', 'UserResource', '/api/users', '/api/users/<string:user_id>')
    _register_resource('resources.profile_resource', 'ProfileResource', '/api/profile', '/api/profile/<string:profile_id>')
    _register_resource('resources.livestock_resource', 'LivestockListResource', '/api/livestock')
    _register_resource('resources.livestock_resource', 'LivestockResource', '/api/livestock/<string:listing_id>')
    _register_resource('resources.exchange_rate_resource', 'ExchangeRateListResource', '/api/exchange-rates')
    _register_resource('resources.exchange_rate_resource', 'ExchangeRateResource', '/api/exchange-rates/<string:rate_id>')
    _register_resource('resources.order_resource', 'OrderListResource', '/api/orders')
    _register_resource('resources.order_resource', 'OrderResource', '/api/orders/<string:order_id>')
    _register_resource('resources.order_item_resource', 'OrderItemListResource', '/api/order-items')
    _register_resource('resources.order_item_resource', 'OrderItemResource', '/api/order-items/<string:item_id>')
    _register_resource('resources.payment_resource', 'PaymentListResource', '/api/payments')
    _register_resource('resources.payment_resource', 'PaymentResource', '/api/payments/<string:payment_id>')
    _register_resource('resources.wishlist_resource', 'WishlistListResource', '/api/wishlist')
    _register_resource('resources.wishlist_resource', 'WishlistResource', '/api/wishlist/<string:wishlist_id>')
    _register_resource('resources.review_resource', 'ReviewListResource', '/api/reviews')
    _register_resource('resources.review_resource', 'ReviewResource', '/api/reviews/<string:review_id>')
    _register_resource('resources.announcement_resource', 'AnnouncementListResource', '/api/announcements')
    _register_resource('resources.announcement_resource', 'AnnouncementResource', '/api/announcements/<string:announcement_id>')
    _register_resource('resources.report_resource', 'ReportListResource', '/api/reports')
    _register_resource('resources.report_resource', 'ReportResource', '/api/reports/<string:report_id>')
    _register_resource('resources.revenue_record_resource', 'RevenueRecordListResource', '/api/revenue-records')
    _register_resource('resources.revenue_record_resource', 'RevenueRecordResource', '/api/revenue-records/<string:record_id>')
    _register_resource('resources.earnings_records_resource', 'EarningsRecordListResource', '/api/earnings-records')
    _register_resource('resources.earnings_records_resource', 'EarningsRecordResource', '/api/earnings-records/<string:record_id>')
    _register_resource('resources.analytics_resource', 'AnalyticsListResource', '/api/analytics')
    _register_resource('resources.analytics_resource', 'AnalyticsResource', '/api/analytics/<string:analytics_id>')


def _register_resource(module_path, class_name, *urls):
    try:
        import importlib
        module = importlib.import_module(module_path)
        resource_class = getattr(module, class_name)
        api.add_resource(resource_class, *urls)
    except (ImportError, AttributeError):
        pass


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
