from extensions import db
from datetime import datetime


class Livestock(db.Model):
    __tablename__ = 'livestock'

    id = db.Column(db.String(36), primary_key=True)
    type = db.Column(db.String(50), nullable=False)
    breed = db.Column(db.String(120), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    age = db.Column(db.String(50), nullable=True)
    gender = db.Column(db.String(20), nullable=True)
    weight = db.Column(db.Float, nullable=True)
    weight_unit = db.Column(db.String(20), nullable=True, default='kg')
    location = db.Column(db.String(255), nullable=True)
    farmer_id = db.Column(db.String(36), nullable=True)
    farmer_name = db.Column(db.String(255), nullable=True)
    images = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(50), nullable=False, default='active')
    is_flagged = db.Column(db.Boolean, nullable=False, default=False)
    flag_reason = db.Column(db.String(255), nullable=True)
    rating = db.Column(db.Float, nullable=False, default=0)
    review_count = db.Column(db.Integer, nullable=False, default=0)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type,
            'breed': self.breed,
            'title': self.title,
            'description': self.description,
            'price': self.price,
            'quantity': self.quantity,
            'age': self.age,
            'gender': self.gender,
            'weight': self.weight,
            'weightUnit': self.weight_unit,
            'location': self.location,
            'farmerId': self.farmer_id,
            'farmerName': self.farmer_name,
            'images': self.images.split(',') if self.images else [],
            'status': self.status,
            'isFlagged': self.is_flagged,
            'flagReason': self.flag_reason,
            'rating': self.rating,
            'reviewCount': self.review_count,
            'createdAt': self.created_at.isoformat() if self.created_at else None,
        }
