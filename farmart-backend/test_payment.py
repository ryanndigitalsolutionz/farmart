from decimal import Decimal

from app import create_app
from extensions import db, bcrypt
from models.user import User
from models.order import Order, OrderStatus


app = create_app()

with app.app_context():
    buyer_email = "mpesa-test@farmart.local"

    buyer = User.query.filter_by(email=buyer_email).first()

    if not buyer:
        buyer = User(
            first_name="M-Pesa",
            last_name="Tester",
            email=buyer_email,
            password_hash=bcrypt.generate_password_hash(
                "TestPayment123!"
            ).decode("utf-8"),
            google_id=None,
            role="buyer",
            is_verified=True,
        )

        db.session.add(buyer)
        db.session.flush()

    order = Order(
        buyer_id=buyer.id,
        total_amount=Decimal("1.00"),
        status=OrderStatus.PENDING,
    )

    db.session.add(order)
    db.session.commit()

    print("Payment test order created.")
    print(f"Buyer ID: {buyer.id}")
    print(f"Order ID: {order.id}")
    print(f"Amount: {order.total_amount}")
