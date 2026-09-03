from flask import request
from flask_restful import Resource
from marshmallow import ValidationError
from models import db
from models.revenue_record import RevenueRecord
from schemas.revenue_record_schema import RevenueRecordSchema

revenue_record_schema = RevenueRecordSchema()
revenue_records_schema = RevenueRecordSchema(many=True)

class RevenueRecordResource(Resource):
    
    def get(self, revenue_id=None):
        """Fetch a single revenue record by ID, or all records if no ID is provided."""
        if revenue_id:
            revenue_record = db.session.get(RevenueRecord, revenue_id)
            if not revenue_record:
                return {"message": "Revenue record not found"}, 404
            return revenue_record_schema.dump(revenue_record), 200

        revenue_records = RevenueRecord.query.all()
        return revenue_records_schema.dump(revenue_records), 200

    def post(self):
        """Create a new revenue record when an order/sale is completed."""
        json_data = request.get_json()
        if not json_data:
            return {"message": "No input data provided"}, 400

        try:
            # Validate and deserialize input using the Marshmallow schema
            validated_data = revenue_record_schema.load(json_data)
        except ValidationError as err:
            return {"message": "Validation errors", "errors": err.messages}, 400

        # Check if an entry for this order already exists to prevent duplicate logging
        existing_record = RevenueRecord.query.filter_by(order_id=validated_data.get("order_id")).first()
        if existing_record:
            return {"message": "A revenue record for this order already exists"}, 400

        try:
            new_revenue = RevenueRecord(**validated_data)
            db.session.add(new_revenue)
            db.session.commit()
            return revenue_record_schema.dump(new_revenue), 201
        except Exception as e:
            db.session.rollback()
            return {"message": "An error occurred while saving the revenue record", "error": str(e)}, 500

    def delete(self, revenue_id):
        """Delete a revenue record if needed (admin/farmer correction)."""
        revenue_record = db.session.get(RevenueRecord, revenue_id)
        if not revenue_record:
            return {"message": "Revenue record not found"}, 404

        try:
            db.session.delete(revenue_record)
            db.session.commit()
            return {"message": "Revenue record deleted successfully"}, 200
        except Exception as e:
            db.session.rollback()
            return {"message": "An error occurred while deleting the record", "error": str(e)}, 500