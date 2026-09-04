from datetime import date
from decimal import Decimal

from app import create_app
from extensions import db, bcrypt
from models import User, Profile, Livestock, Product


app = create_app()


FARMERS = [
    {
        "first_name": "Dalion",
        "last_name": "Gamer",
        "email": "daliongamer002@gmail.com",
        "password": "2026NmO.",
        "farm_name": "Dalion Farm",
        "phone": None,
        "location": "Nairobi",
    },
    {
        "first_name": "Faith",
        "last_name": "Farmer",
        "email": "faith.farmer@example.com",
        "password": "Faith2026!",
        "farm_name": "Faith Farm",
        "phone": None,
        "location": "Kiambu",
    },
    {
        "first_name": "Nairobi",
        "last_name": "Dairy",
        "email": "nairobi.dairy@example.com",
        "password": "Farm2026!",
        "farm_name": "Nairobi Dairy Farm",
        "phone": None,
        "location": "Nairobi",
    },
    {
        "first_name": "Kiambu",
        "last_name": "Goat",
        "email": "kiambu.goat@example.com",
        "password": "Farm2026!",
        "farm_name": "Kiambu Goat Farm",
        "phone": None,
        "location": "Kiambu",
    },
    {
        "first_name": "Nakuru",
        "last_name": "Livestock",
        "email": "nakuru.livestock@example.com",
        "password": "Farm2026!",
        "farm_name": "Nakuru Livestock Farm",
        "phone": None,
        "location": "Nakuru",
    },
    {
        "first_name": "Nyeri",
        "last_name": "Pig",
        "email": "nyeri.pig@example.com",
        "password": "Farm2026!",
        "farm_name": "Nyeri Pig Farm",
        "phone": None,
        "location": "Nyeri",
    },
    {
        "first_name": "Machakos",
        "last_name": "Poultry",
        "email": "machakos.poultry@example.com",
        "password": "Farm2026!",
        "farm_name": "Machakos Poultry Farm",
        "phone": None,
        "location": "Machakos",
    },
]


ADMIN = {
    "first_name": "Ryan",
    "last_name": "Dalion",
    "email": "ryanndigitalsolutionz@gmail.com",
    "password": "Ms3rv!ce",
}


LIVESTOCK = [
    {
        "name": "Maria",
        "type": "Cow",
        "breed": "Friesian",
        "age": 3,
        "sex": "Female",
        "weight": Decimal("420"),
        "weight_unit": "kg",
        "location": "Nairobi",
        "price": Decimal("120000"),
        "quantity": 1,
        "image": "/livestock/cows/kseniya-konovets-rB734RW4xdE-unsplash.jpg",
        "description": (
            "Healthy Friesian dairy cow with good milk production. "
            "Well cared for and suitable for dairy farming."
        ),
        "health_information": (
            "Vaccinated: Yes. Last checkup: 2026-08-15."
        ),
        "availability": "available",
        "seller_email": "nairobi.dairy@example.com",
    },
    {
        "name": "Kamau",
        "type": "Goat",
        "breed": "Boer",
        "age": 2,
        "sex": "Male",
        "weight": Decimal("65"),
        "weight_unit": "kg",
        "location": "Kiambu",
        "price": Decimal("25000"),
        "quantity": 1,
        "image": "/livestock/goats/alexas_fotos-DmuqS6KTf6M-unsplash.jpg",
        "description": (
            "Strong and healthy Boer goat with good body condition. "
            "Suitable for breeding and meat production."
        ),
        "health_information": (
            "Vaccinated: Yes. Last checkup: 2026-08-10."
        ),
        "availability": "available",
        "seller_email": "kiambu.goat@example.com",
    },
    {
        "name": "Milka",
        "type": "Sheep",
        "breed": "Dorper",
        "age": 2,
        "sex": "Female",
        "weight": Decimal("58"),
        "weight_unit": "kg",
        "location": "Nakuru",
        "price": Decimal("18000"),
        "quantity": 1,
        "image": "/livestock/sheep/bill-fairs-1j9Yrl0nW10-unsplash.jpg",
        "description": (
            "Healthy Dorper sheep in good condition. "
            "Suitable for breeding and quality meat production."
        ),
        "health_information": (
            "Vaccinated: Yes. Last checkup: 2026-08-01."
        ),
        "availability": "available",
        "seller_email": "nakuru.livestock@example.com",
    },
    {
        "name": "Kasuku",
        "type": "Pig",
        "breed": "Landrace",
        "age": 1,
        "sex": "Male",
        "weight": Decimal("110"),
        "weight_unit": "kg",
        "location": "Nyeri",
        "price": Decimal("35000"),
        "quantity": 1,
        "image": "/livestock/pigs/kimberly-lake-VBmRbvMrb7A-unsplash.jpg",
        "description": (
            "Young Landrace pig in good health with good growth potential. "
            "Suitable for commercial pig farming."
        ),
        "health_information": (
            "Vaccinated: Yes. Last checkup: 2026-08-12."
        ),
        "availability": "available",
        "seller_email": "nyeri.pig@example.com",
    },
    {
        "name": "Kienyeji Hen",
        "type": "Poultry",
        "breed": "Kienyeji",
        "age": 1,
        "sex": "Female",
        "weight": Decimal("2.5"),
        "weight_unit": "kg",
        "location": "Machakos",
        "price": Decimal("1500"),
        "quantity": 1,
        "image": "/livestock/poultry/egor-myznik-WDKEg5sDz0Y-unsplash.jpg",
        "description": (
            "Healthy Kienyeji hen suitable for egg production and breeding. "
            "Raised under good farm conditions."
        ),
        "health_information": (
            "Vaccinated: Yes. Last checkup: 2026-08-05."
        ),
        "availability": "available",
        "seller_email": "machakos.poultry@example.com",
    },
]


PRODUCTS = [
    {
        "name": "Fresh Eggs",
        "type": "Eggs",
        "description": (
            "Fresh farm eggs collected from healthy, well-cared-for "
            "Kienyeji poultry."
        ),
        "price": Decimal("20"),
        "quantity": Decimal("30"),
        "unit": "eggs",
        "date_produced": date(2026, 8, 10),
        "expiry_date": date(2026, 8, 24),
        "location": "Nairobi",
        "image": "/products/eggs/nick-fewings-qlLCBkTSYAI-unsplash.jpg",
        "availability": "available",
        "seller_email": "daliongamer002@gmail.com",
    },
    {
        "name": "Fresh Milk",
        "type": "Milk",
        "description": (
            "Fresh farm milk collected from healthy dairy cows and "
            "stored under proper farm conditions."
        ),
        "price": Decimal("70"),
        "quantity": Decimal("1000"),
        "unit": "litres",
        "date_produced": date(2026, 8, 25),
        "expiry_date": date(2026, 8, 30),
        "location": "Nairobi",
        "image": "/products/milk/no-revisions-juBur46D3VI-unsplash.jpg",
        "availability": "available",
        "seller_email": "daliongamer002@gmail.com",
    },
    {
        "name": "Farm Butter",
        "type": "Butter",
        "description": (
            "Fresh farm-made butter produced from quality dairy milk."
        ),
        "price": Decimal("100"),
        "quantity": Decimal("500"),
        "unit": "grams",
        "date_produced": date(2026, 8, 18),
        "expiry_date": date(2026, 9, 18),
        "location": "Kiambu",
        "image": "/products/butter/jess-bailey-tT5ACBfqo0s-unsplash.jpg",
        "availability": "available",
        "seller_email": "faith.farmer@example.com",
    },
]


def get_or_create_user(
    first_name,
    last_name,
    email,
    password,
    role,
    farm_name=None,
    location=None,
    phone=None,
):
    user = User.query.filter_by(email=email).first()

    if user:
        user.role = role
        user.is_verified = True

        if role == "farmer":
            if not user.profile:
                profile = Profile(
                    user_id=user.id,
                    description=f"Development profile for {farm_name or first_name}.",
                    phone=phone,
                    location=location,
                    profile_picture=None,
                    farm_name=farm_name,
                    verification_status="approved",
                    rejection_reason=None,
                )
                db.session.add(profile)
            else:
                user.profile.phone = phone
                user.profile.location = location
                user.profile.farm_name = farm_name
                user.profile.verification_status = "approved"
                user.profile.rejection_reason = None

        db.session.commit()
        return user

    user = User(
        first_name=first_name,
        last_name=last_name,
        email=email,
        password_hash=bcrypt.generate_password_hash(password).decode("utf-8"),
        google_id=None,
        role=role,
        is_verified=True,
    )

    db.session.add(user)
    db.session.flush()

    if role == "farmer":
        profile = Profile(
            user_id=user.id,
            description=f"Development profile for {farm_name or first_name}.",
            phone=phone,
            location=location,
            profile_picture=None,
            farm_name=farm_name,
            verification_status="approved",
            rejection_reason=None,
        )
        db.session.add(profile)

    db.session.commit()

    print(f"Created {role}: {email}")

    return user


def seed_admin():
    return get_or_create_user(
        first_name=ADMIN["first_name"],
        last_name=ADMIN["last_name"],
        email=ADMIN["email"],
        password=ADMIN["password"],
        role="admin",
    )


def seed_farmers():
    farmers = {}

    for farmer_data in FARMERS:
        farmer = get_or_create_user(
            first_name=farmer_data["first_name"],
            last_name=farmer_data["last_name"],
            email=farmer_data["email"],
            password=farmer_data["password"],
            role="farmer",
            farm_name=farmer_data["farm_name"],
            location=farmer_data["location"],
            phone=farmer_data["phone"],
        )

        farmers[farmer.email] = farmer

    return farmers


def seed_livestock(farmers):
    for livestock_data in LIVESTOCK:
        seller_email = livestock_data["seller_email"]
        farmer = farmers.get(seller_email)

        if not farmer:
            print(
                f"Skipping {livestock_data['name']}: "
                f"{seller_email} not found."
            )
            continue

        existing = Livestock.query.filter_by(
            name=livestock_data["name"],
            farmer_id=farmer.id,
        ).first()

        if existing:
            print(
                f"Livestock already exists: "
                f"{livestock_data['name']} ({seller_email})"
            )
            continue

        livestock = Livestock(
            farmer_id=farmer.id,
            name=livestock_data["name"],
            type=livestock_data["type"],
            breed=livestock_data["breed"],
            age=livestock_data["age"],
            sex=livestock_data["sex"],
            weight=livestock_data["weight"],
            weight_unit=livestock_data["weight_unit"],
            location=livestock_data["location"],
            price=livestock_data["price"],
            quantity=livestock_data["quantity"],
            image=livestock_data["image"],
            description=livestock_data["description"],
            health_information=livestock_data["health_information"],
            availability=livestock_data["availability"],
        )

        db.session.add(livestock)

        print(
            f"Created livestock: "
            f"{livestock_data['name']} -> {seller_email}"
        )

    db.session.commit()


def seed_products(farmers):
    for product_data in PRODUCTS:
        seller_email = product_data["seller_email"]
        farmer = farmers.get(seller_email)

        if not farmer:
            print(
                f"Skipping {product_data['name']}: "
                f"{seller_email} not found."
            )
            continue

        existing = Product.query.filter_by(
            name=product_data["name"],
            farmer_id=farmer.id,
        ).first()

        if existing:
            print(
                f"Product already exists: "
                f"{product_data['name']} ({seller_email})"
            )
            continue

        product = Product(
            farmer_id=farmer.id,
            name=product_data["name"],
            type=product_data["type"],
            description=product_data["description"],
            price=product_data["price"],
            quantity=product_data["quantity"],
            unit=product_data["unit"],
            date_produced=product_data["date_produced"],
            expiry_date=product_data["expiry_date"],
            location=product_data["location"],
            image=product_data["image"],
            availability=product_data["availability"],
        )

        db.session.add(product)

        print(
            f"Created product: "
            f"{product_data['name']} -> {seller_email}"
        )

    db.session.commit()


def print_seed_summary():
    print("\n" + "=" * 65)
    print("FARMART DEVELOPMENT SEED COMPLETE")
    print("=" * 65)

    print("\nAdmin:")
    print(f"  Email: {ADMIN['email']}")
    print(f"  Password: {ADMIN['password']}")

    print("\nFarmers:")

    for farmer in FARMERS:
        print(f"  {farmer['farm_name']}")
        print(f"    Email: {farmer['email']}")
        print(f"    Password: {farmer['password']}")

    print("\nLivestock:")

    for item in LIVESTOCK:
        print(
            f"  {item['name']} | "
            f"{item['type']} | "
            f"KES {item['price']} | "
            f"{item['location']}"
        )

    print("\nProducts:")

    for item in PRODUCTS:
        print(
            f"  {item['name']} | "
            f"{item['type']} | "
            f"KES {item['price']} | "
            f"{item['quantity']} {item['unit']}"
        )

    print("=" * 65)


if __name__ == "__main__":
    with app.app_context():
        print("\nStarting Farmart development seed...\n")

        seed_admin()
        farmers = seed_farmers()
        seed_livestock(farmers)
        seed_products(farmers)
        print_seed_summary()

        print("\nSeed finished successfully.")
