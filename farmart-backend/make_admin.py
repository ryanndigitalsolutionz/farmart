from app import app
from extensions import db
from models.user import User

with app.app_context():
    email = "otindojoshua21@gmail.com"
    user = User.query.filter_by(email=email).first()

    if not user:
        print(f"No user found with email {email}")
    else:
        user.role = "admin"
        user.is_verified = True
        db.session.commit()
        print(f"User {email} is now role='admin' and verified.")