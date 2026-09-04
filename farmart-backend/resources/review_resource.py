from flask import request, session
from flask_restful import Resource

from models import db, Review
from schemas.review_schema import ReviewSchema

review_schema = ReviewSchema()
reviews_schema = ReviewSchema(many=True)

class ReviewResource(Resource):
    def get(self, review_id=None):
        buyer_id = session.get("user_id")
        
        if not buyer_id:
            return {"message": "Authorization required"}, 401

        if session.get("user_role") != "buyer":
            return {"message": "Buyer access required"}, 403
        
        if review_id:
            review = db.session.get(Review, review_id)

            if not review:
                return {"message": "Review not found"}, 404

            if review.buyer_id != buyer_id:
                return {"message": "Access denied"}, 403

            return review_schema.dump(review), 200

        reviews = Review.query.filter_by(buyer_id=buyer_id).all()

        return reviews_schema.dump(reviews), 200

    def post(self):
        buyer_id = session.get("user_id")

        if not buyer_id:
            return {"message": "Authorization required"}, 401

        if session.get("user_role") != "buyer":
            return {"message": "Buyer access required"}, 403

        data = review_schema.load(request.get_json())

        review = Review(
            buyer_id=buyer_id,
            livestock_id=data["livestock_id"],
            rating=data["rating"],
            comment=data.get("comment"),            
        )

        db.session.add(review)
        db.session.commit()

        return review_schema.dump(review),201

    def put(self, review_id):
        buyer_id = session.get("user_id")

        if not buyer_id:
            return {"message": "Authorization required"}, 401

        if session.get("user_role") != "buyer":
            return {"message": "Buyer access required"}, 403

        review = db.session.get(Review, review_id)

        if not review:
            return {"message": "Review not found"}, 404

        if review.buyer_id != buyer_id:
            return {"message": "Access denied"}, 403

        data = review_schema.load(request.get_json(), partial=True)
        
        if "livestock_id" in data:
            review.livestock_id = data["livestock_id"]
        if "rating" in data:
            review.rating = data["rating"]
        if "comment" in data:
            review.comment = data["comment"]

        db.session.commit()

        return review_schema.dump(review), 200

    def delete(self, review_id):
        buyer_id = session.get("user_id")

        if not buyer_id:
            return {"message": "Authorization required"}, 401

        if session.get("user_role") != "buyer":
            return {"message": "Buyer access required"}, 403

        review = db.session.get(Review, review_id)

        if not review:
            return {"message": "Review not found"}, 404

        if review.buyer_id != buyer_id:
            return {"message": "Access denied"}, 403

        db.session.delete(review)
        db.session.commit()

        return {"message": "Review deleted successfully"}, 200