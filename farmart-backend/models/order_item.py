from extensions import db


class OrderItem(db.Model):
    __tablename__ = "order_items"

    id = db.Column(
        db.Integer,
        primary_key=True,
    )

    order_id = db.Column(
        db.Integer,
        db.ForeignKey("orders.id"),
        nullable=False,
    )

    livestock_id = db.Column(
        db.Integer,
        db.ForeignKey("livestock.id"),
        nullable=True,
    )

    product_id = db.Column(
        db.Integer,
        db.ForeignKey("products.id"),
        nullable=True,
    )

    quantity = db.Column(
        db.Integer,
        nullable=False,
    )

    unit_price = db.Column(
        db.Numeric(10, 2),
        nullable=False,
    )

    subtotal = db.Column(
        db.Numeric(10, 2),
        nullable=False,
    )

    order = db.relationship(
        "Order",
        back_populates="items",
    )

    livestock = db.relationship(
        "Livestock",
        back_populates="order_items",
    )

    product = db.relationship(
        "Product",
        back_populates="order_items",
    )
