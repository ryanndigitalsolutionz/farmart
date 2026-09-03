from flask import session, request
from flask_restful import Resource

from models import db, Livestock
from schemas.livestock_schema import LivestockSchema


livestock_schema = LivestockSchema()
livestocks_schema = LivestockSchema(many=True)


class LivestockResource(Resource):
    def get(self, livestock_id=None):
        if livestock_id:
            livestock = db.session.get(Livestock, livestock_id)

            if not livestock:
                return {"message": "Livestock not found"}, 404

            return livestock_schema.dump(livestock), 200

        livestock = Livestock.query.all()

        return livestocks_schema.dump(livestock), 200
    
    def post(self):
        farmer_id = session.get("user_id")

        if not farmer_id:
            return {"message": "Authorization required"}, 401

        if session.get("user_role") != "farmer":
            return {"message": "Farmer access required"}, 403

        data = livestock_schema.load(request.get_json())

        livestock = Livestock(
            farmer_id=farmer_id,
            name=data.get("name"),
            type=data["type"],
            breed=data.get("breed"),
            age=data.get("age"),
            sex=data.get("sex"),
            weight=data["weight"],
            location=data["location"],
            price=data["price"],
            image=data.get("image"),
            description=data.get("description"),
            availability=data.get("availability"),
            health_status=data.get("health_status"),
            vaccinated=data.get("vaccinated"),
            last_checkup=data.get("last_checkup"),
        )

        db.session.add(livestock)
        db.session.commit()

        return livestock_schema.dump(livestock), 201

    def patch(self, livestock_id):
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

        data = livestock_schema.load(
            request.get_json(),
            partial=True,
        )

        if "name" in data:
            livestock.name = data["name"]

        if "type" in data:
            livestock.type = data["type"]

        if "breed" in data:
            livestock.breed = data["breed"]

        if "age" in data:
            livestock.age = data["age"]

        if "sex" in data:
            livestock.sex = data["sex"]

        if "weight" in data:
            livestock.weight = data["weight"]

        if "location" in data:
            livestock.location = data["location"]

        if "price" in data:
            livestock.price = data["price"]

        if "image" in data:
            livestock.image = data["image"]

        if "description" in data:
            livestock.description = data["description"]

        if "availability" in data:
            livestock.availability = data["availability"]

        if "health_status" in data:
            livestock.health_status = data["health_status"]

        if "vaccinated" in data:
            livestock.vaccinated = data["vaccinated"]

        if "last_checkup" in data:
            livestock.last_checkup = data["last_checkup"]

        db.session.commit()

        return livestock_schema.dump(livestock), 200





