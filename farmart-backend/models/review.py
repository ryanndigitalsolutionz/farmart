from datetime import datetime, timezone

from extensions import db

class Review(db.Model):
    __tablename__ = "reviews"

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
    rating = db.Column(
        db.Integer, 
        nullable=False
    )
    comment = db.Column(
        db.Text, 
        nullable=True
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

    buyer = db.relationship(
        "User"
    )
    livestock = db.relationship(
        "Livestock", 
        back_populates="reviews"
    )
