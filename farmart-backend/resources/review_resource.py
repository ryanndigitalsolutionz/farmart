from flask import request
from flask_restful import Resource

from models import db, Review
from schemas.review_schema import ReviewSchema

review_schema = ReviewSchema()
reviews_schema = ReviewSchema(many=True)

class ReviewResource(Resource):
    def get(self, review_id=None):
        if review_id:
            review = db.session.get(Review, review_id)

            if not review:
                return {"message": "Review not found"}, 404

            return review_schema.dump(review), 200

        reviews = Review.query.all()

        return reviews_schema.dump(reviews), 200

    def post(self):
        data = review_schema.load(request.get_json())

        review = Review(
            livestock_id=data["livestock_id"],
            rating=data["rating"],
            comment=data.get("comment"),
            # buyer_id come from authenticated user
        )

        db.session.add(review)
        db.session.commit()

        return review_schema.dump(review),201