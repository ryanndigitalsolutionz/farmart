from flask import request
from flask_restful import Resource

from models import db, Wishlist
from schemas.wishlist_schema import WishlistSchema

wishlist_schema = WishlistSchema()
wishlists_schema = WishlistSchema(many=True)

class WishlistResource(Resource):
    def get(self):
        # buyer_id will come fron authenticated user

        wishlists = Wishlist.query.all()

        return wishlists_schema.dump(wishlists), 200

    def post(self):
        data = wishlist_schema.load(request.get_json())

        wishlist = Wishlist(
            livestock_id=data["livestock_id"],
            # buyer_id come from authenticated user
        )

        db.session.add(wishlist)
        db.session.commit()

        return wishlist_schema.dump(wishlist),201
    
    def delete(self, wishlist_id):
        wishlist = db.session.get(Wishlist, wishlist_id)

        if not wishlist:
            return {"message": "Wishlist item not found"}

        db.session.add(wishlist)
        db.session.commit()

        return {"message": "Removed from wishlist"}, 200
