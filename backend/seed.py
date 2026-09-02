import uuid
from datetime import datetime
from app import create_app, db
from models.livestock import Livestock
from models.exchange_rate import ExchangeRate


def seed_livestock():
    if Livestock.query.first():
        return

    listings = [
        {
            'id': 'l1',
            'type': 'cattle',
            'breed': 'Boran Bull',
            'title': 'Healthy Boran Bull — 2.5 years',
            'description': 'Well-maintained Boran bull, vaccinated, grass-fed.',
            'price': 85000,
            'quantity': 1,
            'age': '2.5 years',
            'gender': 'male',
            'weight': 420,
            'weight_unit': 'kg',
            'location': 'Nakuru, Kenya',
            'farmer_id': 'f1',
            'farmer_name': 'Kiambu Green Pastures',
            'images': '',
            'status': 'active',
            'is_flagged': False,
            'flag_reason': None,
            'rating': 4.8,
            'review_count': 12,
            'created_at': datetime.utcnow(),
        },
        {
            'id': 'l2',
            'type': 'goat',
            'breed': 'Galla Goat',
            'title': 'Galla Doe — Excellent for breeding',
            'description': 'Pure Galla doe, 1.5 years old, healthy.',
            'price': 15000,
            'quantity': 3,
            'age': '1.5 years',
            'gender': 'female',
            'weight': 45,
            'weight_unit': 'kg',
            'location': 'Kiambu, Kenya',
            'farmer_id': 'f1',
            'farmer_name': 'Kiambu Green Pastures',
            'images': '',
            'status': 'active',
            'is_flagged': False,
            'flag_reason': None,
            'rating': 4.5,
            'review_count': 8,
            'created_at': datetime.utcnow(),
        },
        {
            'id': 'l3',
            'type': 'cattle',
            'breed': 'Friesian Cow',
            'title': 'Friesian Cow — High milk yield',
            'description': 'Friesian cow producing 25L/day.',
            'price': 120000,
            'quantity': 1,
            'age': '4 years',
            'gender': 'female',
            'weight': 550,
            'weight_unit': 'kg',
            'location': 'Nyeri, Kenya',
            'farmer_id': 'f2',
            'farmer_name': 'Nakuru Boran Ranch',
            'images': '',
            'status': 'active',
            'is_flagged': False,
            'flag_reason': None,
            'rating': 4.9,
            'review_count': 15,
            'created_at': datetime.utcnow(),
        },
        {
            'id': 'l4',
            'type': 'poultry',
            'breed': 'Kienyeji',
            'title': 'Free-range Kienyeji Chicken — 12 weeks',
            'description': 'Free-range indigenous chickens.',
            'price': 1200,
            'quantity': 20,
            'age': '12 weeks',
            'gender': 'mixed',
            'weight': 2.5,
            'weight_unit': 'kg',
            'location': 'Meru, Kenya',
            'farmer_id': 'f2',
            'farmer_name': 'Nakuru Boran Ranch',
            'images': '',
            'status': 'active',
            'is_flagged': True,
            'flag_reason': 'price outlier',
            'rating': 4.2,
            'review_count': 5,
            'created_at': datetime.utcnow(),
        },
        {
            'id': 'l5',
            'type': 'goat',
            'breed': 'Boer',
            'title': 'Boer Buck — Prime breeding stock',
            'description': 'Pedigree Boer buck, 2 years old.',
            'price': 35000,
            'quantity': 1,
            'age': '2 years',
            'gender': 'male',
            'weight': 70,
            'weight_unit': 'kg',
            'location': 'Nakuru, Kenya',
            'farmer_id': 'f3',
            'farmer_name': 'Meru Highland Farm',
            'images': '',
            'status': 'pending_review',
            'is_flagged': False,
            'flag_reason': None,
            'rating': 0,
            'review_count': 0,
            'created_at': datetime.utcnow(),
        },
        {
            'id': 'l6',
            'type': 'sheep',
            'breed': 'Dorper',
            'title': 'Dorper Ram — Mature and ready',
            'description': 'Mature Dorper ram, parasite-controlled.',
            'price': 22000,
            'quantity': 2,
            'age': '2 years',
            'gender': 'male',
            'weight': 80,
            'weight_unit': 'kg',
            'location': 'Narok, Kenya',
            'farmer_id': 'f2',
            'farmer_name': 'Nakuru Boran Ranch',
            'images': '',
            'status': 'active',
            'is_flagged': False,
            'flag_reason': None,
            'rating': 4.6,
            'review_count': 7,
            'created_at': datetime.utcnow(),
        },
    ]

    for item in listings:
        db.session.add(Livestock(**item))

    db.session.commit()
    print(f'Seeded {len(listings)} livestock listings.')


def seed_exchange_rates():
    if ExchangeRate.query.first():
        return

    rates = [
        {
            'id': 'er1',
            'from_currency': 'KES',
            'to_currency': 'USD',
            'rate': 0.0077,
            'updated_at': datetime.utcnow(),
        },
        {
            'id': 'er2',
            'from_currency': 'KES',
            'to_currency': 'EUR',
            'rate': 0.0070,
            'updated_at': datetime.utcnow(),
        },
        {
            'id': 'er3',
            'from_currency': 'USD',
            'to_currency': 'KES',
            'rate': 129.87,
            'updated_at': datetime.utcnow(),
        },
        {
            'id': 'er4',
            'from_currency': 'EUR',
            'to_currency': 'KES',
            'rate': 142.86,
            'updated_at': datetime.utcnow(),
        },
    ]

    for rate in rates:
        db.session.add(ExchangeRate(**rate))

    db.session.commit()
    print(f'Seeded {len(rates)} exchange rates.')


def seed():
    app = create_app()
    with app.app_context():
        db.create_all()
        seed_livestock()
        seed_exchange_rates()
        print('Seeding complete.')


if __name__ == '__main__':
    seed()
