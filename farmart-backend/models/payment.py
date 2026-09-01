from enum import Enum
from datetime import datetime, timezone

from . import db


class PaymentMethod(Enum):
    CARD = "card"
    MPESA = "mpesa"
    CASH = "cash"
    BANK_TRANSFER = "bank_transfer"

class PaymentStatus(Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"

class Payment(db.Model):
    __tablename__ = "payments"

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(
        db.Integer, 
        db.ForeignKey("orders.id"), 
        nullable=False,
    )
    amount = db.Column(db.Numeric(10, 2), nullable=False)
    payment_method = db.Column(db.Enum(PaymentMethod), nullable=False)
    transaction_reference = db.Column(
        db.String(50), 
        nullable=False, 
        unique=True)
    status = db.Column(
        db.Enum(PaymentStatus), 
        nullable=False,
        default=PaymentStatus.PENDING,
    )
    paid_at = db.Column(
        db.DateTime(timezone=True), 
        default=lambda: datetime.now(timezone.utc), 
        nullable=False,
    )
    order = db.relationship(
        "Order", 
        back_populates="payments"
    )    
    