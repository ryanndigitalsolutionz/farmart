import secrets
from urllib.parse import urlencode

from flask import Blueprint, redirect, request, session

from config import Config


auth_bp = Blueprint("auth", __name__)


GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"

GOOGLE_SCOPES = [
    "openid",
    "email",
    "profile",
]


@auth_bp.route("/google", methods=["GET"])
def google_login():
    """
    Start the Google OAuth login flow.
    """

    role = request.args.get("role", "farmer")

    allowed_roles = {
        "farmer",
        "buyer",
        "admin",
    }

    if role not in allowed_roles:
        return {
            "success": False,
            "error": "Invalid role.",
        }, 400

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
