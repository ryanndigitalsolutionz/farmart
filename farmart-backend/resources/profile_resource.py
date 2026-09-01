from flask import request
from flask_restful import Resource

from extensions import db
from models.profile import Profile
from models.user import User
from schemas.profile_schema import profile_schema


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
            profile.profile_picture = (
                data["profile_picture"]
            )

        db.session.commit()

        return {
            "success": True,
            "profile": profile_schema.dump(profile),
        }, 200
