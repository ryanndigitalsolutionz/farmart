from datetime import datetime
from extensions import db


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    password_hash = db.Column(db.String, nullable=True)
    google_id = db.Column(db.String, nullable=True, unique=True)
    role = db.Column(db.String, nullable=False)
    is_verified = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )

    profile = db.relationship(
        "Profile",
        backref="user",
        uselist=False,
        cascade="all, delete-orphan",
    )
    livestock = db.relationship(
        "Livestock",
        back_populates="farmer",
    )
    products = db.relationship(
        "Product",
        back_populates="farmer",
    )
    orders = db.relationship(
        "Order",
        back_populates="buyer",
    )
    reviews = db.relationship(
        "Review",
        back_populates="buyer",
    )
    wishlist = db.relationship(
        "Wishlist",
        back_populates="buyer",
    )

    def __repr__(self):
        return f"<User {self.email}>"
