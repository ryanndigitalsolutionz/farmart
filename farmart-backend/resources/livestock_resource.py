from flask import request
from flask_restful import Resource

from extensions import db
from models.livestock import Livestock
from schemas.livestock_schema import LivestockSchema

livestock_schema = LivestockSchema()
livestock_list_schema = LivestockSchema(many=True)


class LivestockResource(Resource):

    def get(self, livestock_id=None):
        if livestock_id:
            livestock = db.session.get(Livestock, livestock_id)

            if not livestock:
                return {"message": "Livestock not found"}, 404

            return livestock_schema.dump(livestock), 200

        livestock = Livestock.query.all()

        return livestock_list_schema.dump(livestock), 200

    def post(self):
        data = request.get_json() or {}

        try:
            livestock_data = livestock_schema.load(data)

            livestock = Livestock(**livestock_data)

            db.session.add(livestock)
            db.session.commit()

            return {
                "message": "Livestock listing created successfully",
                "livestock": livestock_schema.dump(livestock),
            }, 201

        except Exception as error:
            db.session.rollback()

            return {
                "message": "Unable to create livestock listing",
                "error": str(error),
            }, 400

    def put(self, livestock_id):
        livestock = db.session.get(Livestock, livestock_id)

        if not livestock:
            return {"message": "Livestock not found"}, 404

        data = request.get_json() or {}

        try:
            livestock_data = livestock_schema.load(
                data,
                partial=True,
            )

            for key, value in livestock_data.items():
                setattr(livestock, key, value)

            db.session.commit()

            return {
                "message": "Livestock listing updated successfully",
                "livestock": livestock_schema.dump(livestock),
            }, 200

        except Exception as error:
            db.session.rollback()

            return {
                "message": "Unable to update livestock listing",
                "error": str(error),
            }, 400

    def delete(self, livestock_id):
        livestock = db.session.get(Livestock, livestock_id)

        if not livestock:
            return {"message": "Livestock not found"}, 404

        db.session.delete(livestock)
        db.session.commit()

        return {
            "message": "Livestock listing deleted successfully",
        }, 200
