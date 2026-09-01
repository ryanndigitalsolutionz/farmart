from datetime import datetime, timezone

from . import db

class Wishlist(db.Model):
    __tablename__ = "wishlist"

    id = db.Column(
        db.Integer, 
        primary_key=True
    )
    buyer_id = db.Column(
        db.Integer, 
        db.ForeignKey("users.id"), 
        nullable=False
    )
    livestock_id = db.Column(
        db.Integer, 
        db.ForeignKey("livestock.id"), 
        nullable=False
    )
    created_at = db.Column(
        db.DateTime(timezone=True), 
        default=lambda: datetime.now(timezone.utc), 
        nullable=False,
    )

    buyer = db.relationship(
        "User", 
        back_populates="wishlist"
    )
    livestock = db.relationship(
        "Livestock", 
        back_populates="wishlist"
    )
