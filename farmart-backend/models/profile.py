from datetime import datetime
from extensions import db


class Profile(db.Model):
    __tablename__ = "profiles"

    id = db.Column(db.Integer, primary_key=True,)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False, unique=True)
    description = db.Column(db.Text, nullable=True)
    phone = db.Column(db.String, nullable=True)
    location = db.Column(db.String, nullable=True)
    profile_picture = db.Column(db.String, nullable=True)
    farm_name = db.Column(db.String, nullable=True)
    verification_status = db.Column(db.String, nullable=False, default="pending")
    rejection_reason = db.Column(db.String, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    def __repr__(self):
        return f"<Profile user_id={self.user_id}>"