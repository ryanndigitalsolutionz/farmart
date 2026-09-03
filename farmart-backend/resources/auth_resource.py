from datetime import datetime, timedelta
import secrets
from urllib.parse import urlencode

from flask import (
    Blueprint,
    jsonify,
    redirect,
    request,
    session,
)

from config import Config
from extensions import bcrypt, db
from models import User, PasswordResetToken
from services.email_service import send_password_reset_otp


auth_bp = Blueprint("auth", __name__)


GOOGLE_AUTH_URL = (
    "https://accounts.google.com/o/oauth2/v2/auth"
)

GOOGLE_SCOPES = [
    "openid",
    "email",
    "profile",
]

@auth_bp.route(
    "/google",
    methods=["GET"],
)
def google_login():
    """
    Start the Google OAuth login flow.
    """

    role = request.args.get(
        "role",
        "farmer",
    )

    allowed_roles = {
        "farmer",
        "buyer",
        "admin",
    }

    if role not in allowed_roles:
        return jsonify({
            "success": False,
            "error": "Invalid role.",
        }), 400

    state = secrets.token_urlsafe(32)

    session["google_oauth_state"] = state
    session["google_oauth_role"] = role

    params = {
        "client_id": Config.GOOGLE_CLIENT_ID,
        "redirect_uri": Config.GOOGLE_REDIRECT_URL,
        "response_type": "code",
        "scope": " ".join(GOOGLE_SCOPES),
        "state": state,
        "access_type": "offline",
        "prompt": "select_account",
    }

    authorization_url = (
        f"{GOOGLE_AUTH_URL}?{urlencode(params)}"
    )

    return redirect(authorization_url)

@auth_bp.route(
    "/login",
    methods=["POST"],
)
def login():
    """
    Authenticate a user with email and password.
    """

    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "error": "Request data is required.",
        }), 400

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({
            "success": False,
            "error": "Email and password are required.",
        }), 400

    email = email.strip().lower()

    user = User.query.filter_by(
        email=email
    ).first()

    if not user:
        return jsonify({
            "success": False,
            "error": "Invalid email or password.",
        }), 401

    if not user.password_hash:
        return jsonify({
            "success": False,
            "error": (
                "This account does not have a password. "
                "Please continue with Google."
            ),
        }), 401

    if not bcrypt.check_password_hash(
        user.password_hash,
        password,
    ):
        return jsonify({
            "success": False,
            "error": "Invalid email or password.",
        }), 401

    if not user.is_verified:
        return jsonify({
            "success": False,
            "error": (
                "Your Farmart account has not been "
                "verified yet."
            ),
        }), 403

    session["user_id"] = user.id
    session["user_role"] = user.role

    return jsonify({
        "success": True,
        "message": "Login successful.",
        "user": {
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "role": user.role,
            "is_verified": user.is_verified,
        },
    }), 200

@auth_bp.route(
    "/register",
    methods=["POST"],
)
def register():
    """
    Create a new Farmer or Buyer account.
    Newly registered accounts require verification
    before normal login access is granted.
    """

    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "error": "Request data is required.",
        }), 400

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    role = data.get("role")

    if not name or not email or not password or not role:
        return jsonify({
            "success": False,
            "error": (
                "Name, email, password, "
                "and role are required."
            ),
        }), 400

    name = name.strip()
    email = email.strip().lower()
    role = role.strip().lower()

    if role not in {"farmer", "buyer"}:
        return jsonify({
            "success": False,
            "error": "Only Farmer and Buyer accounts can register.",
        }), 400

    if len(password) < 8:
        return jsonify({
            "success": False,
            "error": (
                "Password must be at least "
                "8 characters."
            ),
        }), 400

    existing_user = User.query.filter_by(
        email=email
    ).first()

    if existing_user:
        return jsonify({
            "success": False,
            "error": (
                "An account with that email "
                "already exists."
            ),
        }), 409

    name_parts = name.split(maxsplit=1)

    first_name = name_parts[0]
    last_name = (
        name_parts[1]
        if len(name_parts) > 1
        else ""
    )

    password_hash = (
        bcrypt.generate_password_hash(
            password
        ).decode("utf-8")
    )

    user = User(
        first_name=first_name,
        last_name=last_name,
        email=email,
        password_hash=password_hash,
        role=role,
        is_verified=False,
    )

    db.session.add(user)
    db.session.commit()

    session["user_id"] = user.id
    session["user_role"] = user.role

    return jsonify({
        "success": True,
        "message": (
            "Account created successfully. "
            "Your account is awaiting verification."
        ),
        "user": {
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "role": user.role,
            "is_verified": user.is_verified,
        },
    }), 201

@auth_bp.route(
    "/forgot-password",
    methods=["POST"],
)
def forgot_password():
    """
    Send a 6-digit OTP to a user's email
    for password recovery.
    """

    data = request.get_json()

    if not data or not data.get("email"):
        return jsonify({
            "success": False,
            "error": "Email is required.",
        }), 400

    email = data["email"].strip().lower()

    user = User.query.filter_by(
        email=email
    ).first()

    if not user:
        return jsonify({
            "success": False,
            "error": (
                "No account was found with that email."
            ),
        }), 404

    PasswordResetToken.query.filter_by(
        user_id=user.id
    ).delete()

    otp = f"{secrets.randbelow(1000000):06d}"

    expires_at = (
        datetime.utcnow()
        + timedelta(minutes=10)
    )

    reset_token = PasswordResetToken(
        user_id=user.id,
        otp=otp,
        expires_at=expires_at,
    )

    db.session.add(reset_token)
    db.session.commit()

    try:
        send_password_reset_otp(
            user_name=user.first_name,
            user_email=user.email,
            otp=otp,
        )

    except Exception:
        db.session.delete(reset_token)
        db.session.commit()

        return jsonify({
            "success": False,
            "error": "Failed to send verification email.",
        }), 500

    return jsonify({
        "success": True,
        "message": "Verification code sent successfully.",
    }), 200

@auth_bp.route(
    "/verify-password-reset-otp",
    methods=["POST"],
)
def verify_password_reset_otp():
    """
    Verify the 6-digit OTP entered on VerifyEmail.jsx.
    """

    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "error": "Request data is required.",
        }), 400

    email = data.get("email")
    otp = data.get("otp")

    if not email or not otp:
        return jsonify({
            "success": False,
            "error": "Email and OTP are required.",
        }), 400

    email = email.strip().lower()
    otp = str(otp).strip()

    if not otp.isdigit() or len(otp) != 6:
        return jsonify({
            "success": False,
            "error": "OTP must be a 6-digit code.",
        }), 400

    user = User.query.filter_by(
        email=email
    ).first()

    if not user:
        return jsonify({
            "success": False,
            "error": "User not found.",
        }), 404

    reset_token = PasswordResetToken.query.filter_by(
        user_id=user.id,
        otp=otp,
    ).first()

    if not reset_token:
        return jsonify({
            "success": False,
            "error": "Invalid verification code.",
        }), 400

    if datetime.utcnow() > reset_token.expires_at:
        db.session.delete(reset_token)
        db.session.commit()

        return jsonify({
            "success": False,
            "error": "Verification code has expired.",
        }), 400

    session["password_reset_user_id"] = user.id

    db.session.delete(reset_token)
    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Email verified successfully.",
    }), 200

@auth_bp.route(
    "/reset-password",
    methods=["POST"],
)
def reset_password():
    """
    Set a new password after successful
    email verification.
    """

    data = request.get_json()

    if not data or not data.get("password"):
        return jsonify({
            "success": False,
            "error": "New password is required.",
        }), 400

    user_id = session.get(
        "password_reset_user_id"
    )

    if not user_id:
        return jsonify({
            "success": False,
            "error": (
                "Password reset verification "
                "is required."
            ),
        }), 403

    password = data["password"]

    if len(password) < 8:
        return jsonify({
            "success": False,
            "error": (
                "Password must be at least "
                "8 characters."
            ),
        }), 400

    user = db.session.get(
        User,
        user_id,
    )

    if not user:
        session.pop(
            "password_reset_user_id",
            None,
        )

        return jsonify({
            "success": False,
            "error": "User not found.",
        }), 404

    user.password_hash = (
        bcrypt.generate_password_hash(
            password
        ).decode("utf-8")
    )

    db.session.commit()

    session.pop(
        "password_reset_user_id",
        None,
    )

    return jsonify({
        "success": True,
        "message": "Password reset successfully.",
    }), 200
