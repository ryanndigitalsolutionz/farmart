from flask import request
from flask_restful import Resource

from extensions import bcrypt, db
from models.user import User
from schemas.user_schema import user_schema, users_schema


class UserListResource(Resource):

    def get(self):
        users = User.query.all()

        return {
            "success": True,
            "users": users_schema.dump(users),
        }, 200

    def post(self):
        data = request.get_json() or {}

        required_fields = [
            "first_name",
            "last_name",
            "email",
            "role",
        ]

        missing_fields = [
            field
            for field in required_fields
            if not data.get(field)
        ]

        if missing_fields:
            return {
                "success": False,
                "error": "Missing required fields.",
                "fields": missing_fields,
            }, 400

        email = data["email"].strip().lower()

        existing_user = User.query.filter_by(
            email=email
        ).first()

        if existing_user:
            return {
                "success": False,
                "error": "A user with this email already exists.",
            }, 409

        password = data.get("password")

        password_hash = None

        if password:
            password_hash = bcrypt.generate_password_hash(
                password
            ).decode("utf-8")

        user = User(
            first_name=data["first_name"].strip(),
            last_name=data["last_name"].strip(),
            email=email,
            password_hash=password_hash,
            google_id=data.get("google_id"),
            role=data["role"],
            is_verified=data.get(
                "is_verified",
                False,
            ),
        )

        db.session.add(user)
        db.session.commit()

        return {
            "success": True,
            "user": user_schema.dump(user),
        }, 201


class UserResource(Resource):

    def get(self, user_id):
        user = User.query.get(user_id)

        if not user:
            return {
                "success": False,
                "error": "User not found.",
            }, 404

        return {
            "success": True,
            "user": user_schema.dump(user),
        }, 200

    def patch(self, user_id):
        user = User.query.get(user_id)

        if not user:
            return {
                "success": False,
                "error": "User not found.",
            }, 404

        data = request.get_json() or {}

        if "first_name" in data:
            user.first_name = data["first_name"].strip()

        if "last_name" in data:
            user.last_name = data["last_name"].strip()

        if "email" in data:
            email = data["email"].strip().lower()

            existing_user = User.query.filter(
                User.email == email,
                User.id != user.id,
            ).first()

            if existing_user:
                return {
                    "success": False,
                    "error": "That email is already in use.",
                }, 409

            user.email = email

        if "role" in data:
            user.role = data["role"]

        if "is_verified" in data:
            user.is_verified = bool(
                data["is_verified"]
            )

        db.session.commit()

        return {
            "success": True,
            "user": user_schema.dump(user),
        }, 200
