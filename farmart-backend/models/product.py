from datetime import datetime, timezone

from extensions import db


class Product(db.Model):
    __tablename__ = "products"

    id = db.Column(
        db.Integer,
        primary_key=True,
    )

    farmer_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False,
    )

    name = db.Column(
        db.String,
        nullable=False,
    )

    type = db.Column(
        db.String,
        nullable=False,
    )

    description = db.Column(
        db.Text,
        nullable=False,
    )

    price = db.Column(
        db.Numeric(10, 2),
        nullable=False,
    )

    quantity = db.Column(
        db.Numeric(10, 2),
        nullable=False,
    )

    unit = db.Column(
        db.String,
        nullable=False,
    )

    date_produced = db.Column(
        db.Date,
        nullable=False,
    )

    expiry_date = db.Column(
        db.Date,
        nullable=False,
    )

    location = db.Column(
        db.String,
        nullable=False,
    )

    image = db.Column(
        db.String,
        nullable=True,
    )

    availability = db.Column(
        db.String,
        nullable=False,
        default="available",
    )

    created_at = db.Column(
        db.DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    updated_at = db.Column(
        db.DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    farmer = db.relationship(
        "User",
        back_populates="products",
    )

    order_items = db.relationship(
        "OrderItem",
        back_populates="product",
    )
