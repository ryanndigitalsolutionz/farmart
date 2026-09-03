from flask import request
from flask_restful import Resource
from extensions import db
from models.user import User
from models.profile import Profile


def _serialize_farmer(user):
    profile = user.profile
    return {
        "id": user.id,
        "user_id": user.id,
        "farm_name": profile.farm_name if profile else None,
        "location": profile.location if profile else None,
        "phone_number": profile.phone if profile else None,
        "email": user.email,
        "description": "",
        "status": profile.verification_status if profile else "pending",
        "rejection_reason": profile.rejection_reason if profile else None,
        "joined_date": user.created_at.isoformat() if user.created_at else None,
        "listing_count": 0,
        "animals_sold": 0,
        "rating": None,
    }


class FarmerListResource(Resource):
    def get(self):
        farmers = User.query.filter_by(role="farmer").all()
        return [_serialize_farmer(f) for f in farmers], 200


class FarmerResource(Resource):
    def get(self, user_id):
        user = User.query.filter_by(id=user_id, role="farmer").first()
        if not user:
            return {"message": "Farmer not found"}, 404
        return _serialize_farmer(user), 200

    def patch(self, user_id):
        user = User.query.filter_by(id=user_id, role="farmer").first()
        if not user:
            return {"message": "Farmer not found"}, 404

        profile = user.profile
        if not profile:
            profile = Profile(user_id=user.id)
            db.session.add(profile)

        data = request.get_json() or {}
        action = data.get("action")

        if action == "verify":
            profile.verification_status = "verified"
            profile.rejection_reason = None
        elif action == "reject":
            profile.verification_status = "rejected"
            profile.rejection_reason = data.get("reason", "")
        else:
            return {"message": "action must be 'verify' or 'reject'"}, 400

        db.session.commit()
        return _serialize_farmer(user), 200