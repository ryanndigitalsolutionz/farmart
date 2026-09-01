import json
import secrets
import urllib.error
import urllib.parse
import urllib.request

from flask import Blueprint, jsonify, request, session
from config import Config


google_callback_bp = Blueprint("google_callback", __name__)


GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
GOOGLE_USERINFO_URL = ("https://www.googleapis.com/oauth2/v2/userinfo")


@google_callback_bp.route(
    "/google/callback",
    methods=["GET"],
)

def google_callback():
    """
    Handle Google's OAuth callback.
    """

    error = request.args.get("error")

    if error:
        return jsonify({
            "success": False,
            "error": error,
        }), 400

    code = request.args.get("code")
    state = request.args.get("state")

    if not code:
        return jsonify({
            "success": False,
            "error": "Missing authorization code.",
        }), 400

    if not state:
        return jsonify({
            "success": False,
            "error": "Missing OAuth state.",
        }), 400

    saved_state = session.pop(
        "google_oauth_state",
        None,
    )

    if not saved_state or not secrets.compare_digest(
        state,
        saved_state,
    ):
        return jsonify({
            "success": False,
            "error": "Invalid OAuth state.",
        }), 400

    token_data = {
        "code": code,
        "client_id": Config.GOOGLE_CLIENT_ID,
        "client_secret": Config.GOOGLE_CLIENT_SECRET,
        "redirect_uri": Config.GOOGLE_REDIRECT_URL,
        "grant_type": "authorization_code",
    }

    encoded_token_data = urllib.parse.urlencode(
        token_data
    ).encode("utf-8")

    token_request = urllib.request.Request(
        GOOGLE_TOKEN_URL,
        data=encoded_token_data,
        headers={
            "Content-Type":
                "application/x-www-form-urlencoded",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(
            token_request
        ) as response:
            token_response = json.loads(
                response.read().decode("utf-8")
            )

    except urllib.error.HTTPError as error:
        return jsonify({
            "success": False,
            "error": "Google token exchange failed.",
            "details": error.read().decode("utf-8"),
        }), 400

    access_token = token_response.get(
        "access_token"
    )

    if not access_token:
        return jsonify({
            "success": False,
            "error": "Google did not return an access token.",
        }), 400

    user_request = urllib.request.Request(
        GOOGLE_USERINFO_URL,
        headers={
            "Authorization": f"Bearer {access_token}",
        },
        method="GET",
    )

    try:
        with urllib.request.urlopen(
            user_request
        ) as response:
            google_user = json.loads(
                response.read().decode("utf-8")
            )

    except urllib.error.HTTPError as error:
        return jsonify({
            "success": False,
            "error": "Failed to retrieve Google profile.",
            "details": error.read().decode("utf-8"),
        }), 400
    
    return jsonify({
        "success": True,
        "message": "Google authentication successful.",
        "user": {
            "google_id": google_user.get("id"),
            "email": google_user.get("email"),
            "name": google_user.get("name"),
            "first_name": google_user.get("given_name"),
            "last_name": google_user.get("family_name"),
            "picture": google_user.get("picture"),
        },
    }), 200
