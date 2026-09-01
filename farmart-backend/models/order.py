from datetime import datetime, timezone
from enum import Enum

from . import db

class OrderStatus(Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    CANCELLED = "cancelled"
    COMPLETED = "completed"


class Order(db.Model):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True)
    buyer_id = db.Column(
        db.Integer, 
        db.ForeignKey("users.id"), 
        nullable=False
    )
    total_amount = db.Column(
        db.Numeric(10, 2), 
        nullable=False
    )
    status = db.Column(
        db.Enum(OrderStatus), 
        nullable=False,
        default=OrderStatus.PENDING
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

    items = db.relationship(
        "OrderItem",
        back_populates="order",
        cascade="all, delete-orphan"
    )

    buyer = db.relationship(
        "User", 
        back_populates="orders"
    )

    payments = db.relationship(
        "Payment",
        back_populates="order",
        cascade="all, delete-orphan"
    )