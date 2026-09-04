from flask import request, session
from flask_restful import Resource

from extensions import db
from models.livestock import Livestock
from schemas.livestock_schema import LivestockSchema

livestock_schema = LivestockSchema()
livestock_list_schema = LivestockSchema(many=True)


class LivestockResource(Resource):

    def get(self, livestock_id=None):
        farmer_id = session.get("user_id")
        role = session.get("user_role")

        if livestock_id:
            livestock = db.session.get(Livestock, livestock_id)

            if not livestock:
                return {"message": "Livestock not found"}, 404

            if role == "farmer" and livestock.farmer_id != farmer_id:
                return {"message": "Access denied"}, 403

            return livestock_schema.dump(livestock), 200

        if role == "farmer":
            if not farmer_id:
                return {"message": "Authorization required"}, 401

            livestock = Livestock.query.filter_by(
                farmer_id=farmer_id
            ).all()
        else:
            livestock = Livestock.query.all()

        return livestock_list_schema.dump(livestock), 200

    def post(self):
        farmer_id = session.get("user_id")

        if not farmer_id:
            return {"message": "Authorization required"}, 401

        if session.get("user_role") != "farmer":
            return {"message": "Farmer access required"}, 403

        data = request.get_json() or {}

        try:
            livestock_data = livestock_schema.load(data)

            livestock = Livestock(
                farmer_id=farmer_id,
                **livestock_data,
            )

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
        farmer_id = session.get("user_id")

        if not farmer_id:
            return {"message": "Authorization required"}, 401

        if session.get("user_role") != "farmer":
            return {"message": "Farmer access required"}, 403

        livestock = db.session.get(Livestock, livestock_id)

        if not livestock:
            return {"message": "Livestock not found"}, 404

        if livestock.farmer_id != farmer_id:
            return {"message": "Access denied"}, 403

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
        farmer_id = session.get("user_id")

        if not farmer_id:
            return {"message": "Authorization required"}, 401

        if session.get("user_role") != "farmer":
            return {"message": "Farmer access required"}, 403

        livestock = db.session.get(Livestock, livestock_id)

        if not livestock:
            return {"message": "Livestock not found"}, 404

        if livestock.farmer_id != farmer_id:
            return {"message": "Access denied"}, 403

        try:
            db.session.delete(livestock)
            db.session.commit()

            return {
                "message": "Livestock listing deleted successfully",
            }, 200

        except Exception as error:
            db.session.rollback()

            return {
                "message": "Unable to delete livestock listing",
                "error": str(error),
            }, 400
