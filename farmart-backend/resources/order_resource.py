from flask import request, session
from flask_restful import Resource

from models import db, Order, OrderItem, Livestock
from schemas.order_schema import OrderSchema

order_schema = OrderSchema()
orders_schema = OrderSchema(many=True)

class OrderResource(Resource):
    
    def get(self, order_id=None):
        buyer_id = session.get("user_id")
        
        if not buyer_id:
            return {"message": "Authorization required"}, 401

        if session.get("user_role") != "buyer":
            return {"message": "Buyer access required"}, 403
        
        if order_id:
            order = db.session.get(Order, order_id)

            if not order:
                return {"message": "Order not found"}, 404

            if order.buyer_id != buyer_id:
                return {"message": "Access denied"}, 403

            return order_schema.dump(order), 200

        orders = Order.query.filter_by(buyer_id=buyer_id).all()
        
        return orders_schema.dump(orders), 200

    def post(self):
        buyer_id = session.get("user_id")

        if not buyer_id: 
            return {"message": "Authorization required"}, 401 
        if session.get("user_role") != "buyer": 
            return {"message": "Buyer access required"}, 403 
        data = order_schema.load(request.get_json()) 

        livestock = db.session.get(
            Livestock, 
            data["livestock_id"] 
        ) 
        if not livestock: 
            return {"message": "Livestock not found"}, 404 
        
        if livestock.availability != "Available": 
            return {"message": "Livestock is unavailable"}, 400 

        quantity = data["quantity"] 
        unit_price = livestock.price 
        subtotal = unit_price * quantity 

        order = Order( 
            buyer_id=buyer_id, 
            total_amount=subtotal, 
        ) 

        db.session.add(order) 
        db.session.flush() 

        order_item = OrderItem( 
            order_id=order.id, 
            livestock_id=livestock.id, 
            quantity=quantity, 
            unit_price=unit_price, 
            subtotal=subtotal, 
        ) 

        db.session.add(order_item) 
        db.session.commit() 

        return order_schema.dump(order), 201
    