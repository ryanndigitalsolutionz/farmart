from datetime import datetime, timezone

from extensions import db


class Livestock(db.Model):
    __tablename__ = "livestock"

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

    breed = db.Column(
        db.String,
        nullable=False,
    )

    age = db.Column(
        db.Integer,
        nullable=False,
    )

    sex = db.Column(
        db.String,
        nullable=False,
    )

    weight = db.Column(
        db.Numeric(10, 2),
        nullable=True,
    )

    weight_unit = db.Column(
        db.String,
        nullable=True,
    )

    location = db.Column(
        db.String,
        nullable=False,
    )

    price = db.Column(
        db.Numeric(10, 2),
        nullable=False,
    )

    quantity = db.Column(
        db.Integer,
        nullable=False,
    )

    image = db.Column(
        db.String,
        nullable=True,
    )

    description = db.Column(
        db.Text,
        nullable=False,
    )

    health_information = db.Column(
        db.Text,
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
        back_populates="livestock",
    )

    order_items = db.relationship(
        "OrderItem",
        back_populates="livestock",
    )

    reviews = db.relationship(
        "Review",
        back_populates="livestock",
        cascade="all, delete-orphan",
    )

    wishlist = db.relationship(
        "Wishlist",
        back_populates="livestock",
        cascade="all, delete-orphan",
    )
