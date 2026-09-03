from app import create_app
from extensions import db, bcrypt
from models import User, Profile


app = create_app()


with app.app_context():

    farmer_email = "daliongamer002@gmail.com"

    existing_farmer = User.query.filter_by(
        email=farmer_email
    ).first()

    if existing_farmer:
        print("Farmer already exists. Nothing to seed.")

    else:
        farmer = User(
            first_name="Dalion",
            last_name="Gamer",
            email=farmer_email,
            password_hash=bcrypt.generate_password_hash(
                "2026NmO."
            ).decode("utf-8"),
            google_id=None,
            role="farmer",
            is_verified=True,
        )

        db.session.add(farmer)
        db.session.flush()

        profile = Profile(
            user_id=farmer.id,
            phone=None,
            location=None,
            profile_picture=None,
        )

        db.session.add(profile)
        db.session.commit()

        print("Farmer seeded successfully.")
        print(f"Email: {farmer_email}")
        print("Password: 2026NmO.")
