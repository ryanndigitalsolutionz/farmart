from datetime import datetime, timezone

from extensions import db


class Analytics(db.Model):
    __tablename__ = "analytics"

    id = db.Column(
        db.Integer,
        primary_key=True,
    )

    farmer_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False,
        unique=True,
    )

    total_views = db.Column(
        db.Integer,
        nullable=False,
        default=0,
    )

    total_listings = db.Column(
        db.Integer,
        nullable=False,
        default=0,
    )

    total_sales = db.Column(
        db.Integer,
        nullable=False,
        default=0,
    )

    total_revenue = db.Column(
        db.Numeric(12, 2),
        nullable=False,
        default=0,
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
        back_populates="analytics",
    )
