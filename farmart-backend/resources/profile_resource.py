from flask import request, session
from flask_restful import Resource

from extensions import db
from models.profile import Profile
from models.user import User
from schemas.profile_schema import profile_schema


class ProfileResource(Resource):

    def get(self, user_id):
        current_user_id = session.get("user_id")

        if not current_user_id:
            return {
                "success": False,
                "error": "Authentication required.",
            }, 401

        if current_user_id != user_id and session.get("user_role") != "admin":
            return {
                "success": False,
                "error": "Access denied.",
            }, 403

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
        current_user_id = session.get("user_id")

        if not current_user_id:
            return {
                "success": False,
                "error": "Authentication required.",
            }, 401

        if current_user_id != user_id and session.get("user_role") != "admin":
            return {
                "success": False,
                "error": "Access denied.",
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
            profile_picture=data.get("profile_picture"),
            farm_name=data.get("farm_name"),
            verification_status="pending",
            rejection_reason=None,
        )

        if hasattr(profile, "description"):
            profile.description = data.get("description")

        db.session.add(profile)
        db.session.commit()

        return {
            "success": True,
            "profile": profile_schema.dump(profile),
        }, 201

    def patch(self, user_id):
        current_user_id = session.get("user_id")

        if not current_user_id:
            return {
                "success": False,
                "error": "Authentication required.",
            }, 401

        if current_user_id != user_id and session.get("user_role") != "admin":
            return {
                "success": False,
                "error": "Access denied.",
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

        if "profile_picture" in data:
            profile.profile_picture = data["profile_picture"]

        if "farm_name" in data:
            profile.farm_name = data["farm_name"]

        if "description" in data and hasattr(profile, "description"):
            profile.description = data["description"]

        db.session.commit()

        return {
            "success": True,
            "profile": profile_schema.dump(profile),
        }, 200
