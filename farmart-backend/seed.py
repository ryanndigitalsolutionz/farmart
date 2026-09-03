from app import create_app
from extensions import db, bcrypt
from models import User, Profile


app = create_app()


with app.app_context():

    farmer_email = "daliongamer002@gmail.com"
    buyer_email = "faithkamande@gmail.com"

    # Check if farmer already exists
    existing_farmer = User.query.filter_by(
        email=farmer_email
    ).first()

    # Check if buyer already exists
    existing_buyer = User.query.filter_by(
        email=buyer_email
    ).first()

    # Create farmer if they don't exist
    if existing_farmer:
        farmer = existing_farmer
        print("Farmer already exists.")
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

        farmer_profile = Profile(
            user_id=farmer.id,
            phone=None,
            location=None,
            profile_picture=None,
        )

        db.session.add(farmer_profile)

        print("Farmer created successfully.")
        print(f"Email: {farmer_email}")
        print("Password: 2026NmO.")

    # Create buyer if they don't exist
    if existing_buyer:
        buyer = existing_buyer
        print("Buyer already exists.")
    else:
        buyer = User(
            first_name="Faith",
            last_name="Kamande",
            email=buyer_email,
            password_hash=bcrypt.generate_password_hash(
                "12345faith"
            ).decode("utf-8"),
            google_id=None,
            role="buyer",
            is_verified=True,
        )

        db.session.add(buyer)
        db.session.flush()

        buyer_profile = Profile(
            user_id=buyer.id,
            phone=None,
            location=None,
            profile_picture=None,
        )

        db.session.add(buyer_profile)

        print("Buyer created successfully.")
        print(f"Email: {buyer_email}")
        print("Password: 12345faith.")

    db.session.commit()

    print("Database seeding completed successfully.")
