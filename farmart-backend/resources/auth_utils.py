from flask import session

from models.user import User


def get_current_user():
    """
    Look up the logged-in user fresh from the database, keyed off
    the session cookie. We deliberately don't trust session["user_role"]
    for authorization -- it's a snapshot taken at login time, so it
    goes stale the moment an admin's role or account status changes
    underneath an existing session (e.g. promoted via make_admin.py,
    or suspended) until they log in again.
    """

    user_id = session.get("user_id")

    if not user_id:
        return None

    return User.query.get(user_id)


def require_admin():
    """
    Call at the top of an admin-only resource method.
    Returns a (payload, status) error tuple to return immediately,
    or None if the current session belongs to an active admin.
    """

    user = get_current_user()

    if not user:
        return {"message": "Authorization required"}, 401

    if user.role != "admin":
        return {"message": "Admin access required"}, 403

    if not user.is_active:
        return {"message": "This account has been suspended."}, 403

    return None
