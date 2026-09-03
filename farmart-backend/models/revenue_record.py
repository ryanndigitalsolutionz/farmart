from datetime import datetime, timezone
from . import db

class RevenueSource:
    # Optional: categorizing how the revenue came in
    LIVESTOCK_SALE = "livestock_sale"
    OTHER = "other"

class RevenueRecord(db.Model):
    __tablename__ = "revenue_records"

    id = db.Column(db.Integer, primary_key=True)
    
    # Linking directly to Faith's Order model so every revenue record tracks back to a buyer's order
    order_id = db.Column(
        db.Integer,
        db.ForeignKey("orders.id"),
        nullable=False,
        unique=True  # Ensures one revenue record per completed order
    )
    
    # Optional farmer reference depending on how your user/farmer table is structured
    farmer_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=True
    )

    amount = db.Column(db.Numeric(10, 2), nullable=False)
    
    description = db.Column(db.String(255), nullable=True)

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

    # Relationships to tie everything together
    order = db.relationship(
        "Order",
        backref=db.backref("revenue_record", uselist=False)
    )