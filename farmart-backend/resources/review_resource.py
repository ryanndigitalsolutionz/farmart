from flask import request, session
from flask_restful import Resource

from models import db, Review
from schemas.review_schema import ReviewSchema

review_schema = ReviewSchema()
reviews_schema = ReviewSchema(many=True)

class ReviewResource(Resource):
    def get(self, review_id=None):
        buyer_id = request.get("user_id")
        
        if not buyer_id:
            return {"message": "Authorized required"}, 401

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
        buyer_id = request.get("user_id")

        if not buyer_id:
            return {"message": "Authorized required"}, 401

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