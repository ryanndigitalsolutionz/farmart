from flask import request, session
from flask_restful import Resource

from models import db, Wishlist
from schemas.wishlist_schema import WishlistSchema

wishlist_schema = WishlistSchema()
wishlists_schema = WishlistSchema(many=True)

class WishlistResource(Resource):
    def get(self):
        buyer_id = request.get("user_id")

        if not buyer_id:
            return {"message": "Authorized required"}, 401

        if session.get("user_role") != "buyer":
            return {"message": "Buyer access required"}, 403

        wishlists = Wishlist.query.filter_by(
            buyer_id=buyer_id
        ).all()

        return wishlists_schema.dump(wishlists), 200

    def post(self):
        buyer_id = request.get("user_id")
        
        if not buyer_id:
            return {"message": "Authorized required"}, 401

        if session.get("user_role") != "buyer":
            return {"message": "Buyer access required"}, 403

        data = wishlist_schema.load(request.get_json())

        wishlist = Wishlist(
            buyer_id=buyer_id,
            livestock_id=data["livestock_id"],
        )

        db.session.add(wishlist)
        db.session.commit()

        return wishlist_schema.dump(wishlist), 201
    
    def delete(self, wishlist_id):
        buyer_id = request.get("user_id")

        if not buyer_id:
            return {"message": "Authorized required"}, 401

        if session.get("user_role") != "buyer":
            return {"message": "Buyer access required"}, 403
        
        wishlist = db.session.get(Wishlist, wishlist_id)

        if not wishlist:
            return {"message": "Wishlist item not found"}, 404

        if wishlist.buyer_id != buyer_id:
            return {"message": "Access denied"}, 403

        db.session.delete(wishlist)
        db.session.commit()

        return {"message": "Removed from wishlist"}, 200
