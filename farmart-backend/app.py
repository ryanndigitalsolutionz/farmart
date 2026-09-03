import os

from flask import Flask

from config import Config
from extensions import (
    db,
    ma,
    migrate,
    bcrypt,
    cors,
    api,
)

from models import User, Profile

from resources.auth_resource import auth_bp
from resources.google_callback_resource import google_callback_bp
from resources.payment_resource import PaymentResource, MpesaCallbackResource
from resources.livestock_resource import LivestockResource
from resources.product_resource import ProductResource


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

    api.init_app(app)

    app.register_blueprint(
        auth_bp,
        url_prefix="/auth",
    )

    app.register_blueprint(
        google_callback_bp,
        url_prefix="/auth",
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

    return app


app = create_app()


if __name__ == "__main__":
    app.run(
        debug=False,
        host="0.0.0.0",
        port=int(os.getenv("PORT", 5000)),
    )
