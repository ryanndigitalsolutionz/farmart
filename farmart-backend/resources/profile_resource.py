from flask import request, session
from flask_restful import Resource

from extensions import db
from models.profile import Profile
from models.user import User
from schemas.profile_schema import profile_schema


class ProfileMeResource(Resource):
    """Returns the logged-in user's own role/profile, keyed off the
    session cookie rather than a user_id in the URL. Used by the
    frontend route guard to decide which section a session may enter."""

    def get(self):
        user_id = session.get("user_id")

        if not user_id:
            return {"message": "Authorization required"}, 401

        user = db.session.get(User, user_id)

        if not user:
            return {"message": "User not found"}, 404

        profile = user.profile

        return {
            "user": {
                "id": user.id,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "role": user.role,
                "is_verified": user.is_verified,
                "is_active": user.is_active,
            },
            "profile": {
                "farm_name": profile.farm_name,
                "location": profile.location,
                "phone": profile.phone,
                "description": profile.description,
                "verification_status": profile.verification_status,
                "rejection_reason": profile.rejection_reason,
            }
            if profile
            else None,
        }, 200


class ProfileResource(Resource):

    def get(self, user_id):
        profile = Profile.query.filter_by(
            user_id=user_id
        ).first()

        if not profile:
            return {
                "success": False,
                "error": "Profile not found.",
            }, 404

        return {
            "success": True,
            "profile": profile_schema.dump(profile),
        }, 200

    def post(self, user_id):
        if session.get("user_id") != user_id:
            return {
                "success": False,
                "error": "You can only create your own profile.",
            }, 403

        user = User.query.get(user_id)

        if not user:
            return {
                "success": False,
                "error": "User not found.",
            }, 404

        existing_profile = Profile.query.filter_by(
            user_id=user_id
        ).first()

        if existing_profile:
            return {
                "success": False,
                "error": "Profile already exists.",
            }, 409

        data = request.get_json() or {}

        profile = Profile(
            user_id=user_id,
            phone=data.get("phone"),
            location=data.get("location"),
            farm_name=data.get("farm_name"),
            description=data.get("description"),
            profile_picture=data.get(
                "profile_picture"
            ),
        )

        db.session.add(profile)
        db.session.commit()

        return {
            "success": True,
            "profile": profile_schema.dump(profile),
        }, 201

    def patch(self, user_id):
        if session.get("user_id") != user_id:
            return {
                "success": False,
                "error": "You can only update your own profile.",
            }, 403

        profile = Profile.query.filter_by(
            user_id=user_id
        ).first()

        if not profile:
            return {
                "success": False,
                "error": "Profile not found.",
            }, 404

        data = request.get_json() or {}

        if "phone" in data:
            profile.phone = data["phone"]

        if "location" in data:
            profile.location = data["location"]

        if "farm_name" in data:
            profile.farm_name = data["farm_name"]

        if "description" in data:
            profile.description = data["description"]

        if "profile_picture" in data:
            profile.profile_picture = (
                data["profile_picture"]
            )

        if profile.verification_status == "rejected" and (
            "farm_name" in data or "description" in data
        ):
            profile.verification_status = "pending"
            profile.rejection_reason = None

        db.session.commit()

        return {
            "success": True,
            "profile": profile_schema.dump(profile),
        }, 200
