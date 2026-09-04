from flask import request, session
from flask_restful import Resource

from extensions import db
from models.user import User
from models.profile import Profile
from services.email_service import (
    send_farmer_application_received,
    send_farmer_approved,
    send_farmer_rejected,
)


def _serialize_farmer(user):
    profile = user.profile

    return {
        "id": user.id,
        "user_id": user.id,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "name": f"{user.first_name} {user.last_name}".strip(),
        "farm_name": profile.farm_name if profile else None,
        "location": profile.location if profile else None,
        "phone_number": profile.phone if profile else None,
        "email": user.email,
        "description": (
            profile.description
            if profile and hasattr(profile, "description")
            else ""
        ),
        "status": (
            profile.verification_status
            if profile
            else "pending"
        ),
        "rejection_reason": (
            profile.rejection_reason
            if profile
            else None
        ),
        "joined_date": (
            user.created_at.isoformat()
            if user.created_at
            else None
        ),
        "listing_count": 0,
        "animals_sold": 0,
        "rating": None,
    }


class FarmerListResource(Resource):
    def get(self):
        if session.get("user_role") != "admin":
            return {"message": "Admin access required"}, 403

        farmers = User.query.filter_by(role="farmer").all()

        return [
            _serialize_farmer(farmer)
            for farmer in farmers
        ], 200

    def post(self):
        user_id = session.get("user_id")

        if not user_id:
            return {"message": "Authentication required"}, 401

        user = User.query.filter_by(
            id=user_id,
            role="farmer",
        ).first()

        if not user:
            return {"message": "Farmer account not found"}, 404

        data = request.get_json() or {}

        farm_name = (data.get("farm_name") or "").strip()
        location = (data.get("location") or "").strip()
        phone = (data.get("phone") or "").strip()
        description = (data.get("description") or "").strip()

        if not farm_name or not location or not phone or not description:
            return {
                "message": (
                    "Farm name, location, phone, and description "
                    "are required"
                )
            }, 400

        profile = user.profile

        if not profile:
            profile = Profile(user_id=user.id)
            db.session.add(profile)

        profile.farm_name = farm_name
        profile.location = location
        profile.phone = phone

        if hasattr(profile, "description"):
            profile.description = description

        profile.verification_status = "pending"
        profile.rejection_reason = None

        user.is_verified = False

        db.session.commit()

        try:
            send_farmer_application_received(
                farmer_name=user.first_name,
                farmer_email=user.email,
            )
        except Exception:
            return {
                "success": True,
                "email_sent": False,
                "message": (
                    "Farm application submitted, but confirmation "
                    "email could not be sent."
                ),
                "farmer": _serialize_farmer(user),
            }, 201

        return {
            "success": True,
            "email_sent": True,
            "message": "Farm application submitted successfully.",
            "farmer": _serialize_farmer(user),
        }, 201


class FarmerResource(Resource):
    def get(self, user_id):
        if session.get("user_role") != "admin":
            return {"message": "Admin access required"}, 403

        user = User.query.filter_by(
            id=user_id,
            role="farmer",
        ).first()

        if not user:
            return {"message": "Farmer not found"}, 404

        return _serialize_farmer(user), 200

    def patch(self, user_id):
        if session.get("user_role") != "admin":
            return {"message": "Admin access required"}, 403

        user = User.query.filter_by(
            id=user_id,
            role="farmer",
        ).first()

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
            user.is_verified = True

            db.session.commit()

            email_sent = True

            try:
                send_farmer_approved(
                    farmer_name=user.first_name,
                    farmer_email=user.email,
                )
            except Exception:
                email_sent = False

            return {
                "success": True,
                "email_sent": email_sent,
                "message": "Farmer approved successfully.",
                "farmer": _serialize_farmer(user),
            }, 200

        if action == "reject":
            reason = (data.get("reason") or "").strip()

            if not reason:
                return {
                    "message": "A rejection reason is required."
                }, 400

            profile.verification_status = "rejected"
            profile.rejection_reason = reason
            user.is_verified = False

            db.session.commit()

            email_sent = True

            try:
                send_farmer_rejected(
                    farmer_name=user.first_name,
                    farmer_email=user.email,
                    reason=reason,
                )
            except Exception:
                email_sent = False

            return {
                "success": True,
                "email_sent": email_sent,
                "message": "Farmer rejected successfully.",
                "farmer": _serialize_farmer(user),
            }, 200

        return {
            "message": "action must be 'verify' or 'reject'"
        }, 400
