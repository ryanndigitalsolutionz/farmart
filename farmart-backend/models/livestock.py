from datetime import datetime, timezone

from . import db

class Livestock(db.Model):
    __tablename__ = 'livestock'

    id = db.Column(db.Integer, primary_key=True)
    farmer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(100), nullable=True)
    type = db.Column(db.String(50), nullable=False)
    breed = db.Column(db.String(50), nullable=True)
    age = db.Column(db.Integer, nullable=True)
    sex = db.Column(db.String(10), nullable=True)
    weight = db.Column(db.Float, nullable=False)
    location = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    image = db.Column(db.String, nullable=True)
    description = db.Column(db.Text, nullable=True)
    availability = db.Column(db.String, nullable=True)
    health_status = db.Column(db.String(50), nullable=True)
    vaccinated = db.Column(db.Boolean, nullable=True)
    last_checkup = db.Column(db.Date, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc), nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now(timezone.utc), nullable=False)
    
    wishlist = db.relationship(
        "Wishlist", 
        back_populates="livestock", 
        cascade="all, delete-orphan"
    )
    order_items = db.relationship( 
        "OrderItem", 
        back_populates="livestock" 
    ) 
    reviews = db.relationship( 
        "Review", 
        back_populates="livestock", 
        cascade="all, delete-orphan" 
    )

    def __repr__(self):
        return f'<Livestock {self.name}>'