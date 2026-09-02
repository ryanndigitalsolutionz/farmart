from flask import request
from flask_restful import Resource
from models.livestock import Livestock
from schemas.livestock_schema import LivestockSchema
from extensions import db
from datetime import datetime


livestock_schema = LivestockSchema()
livestock_list_schema = LivestockSchema(many=True)


def _build_listing_payload(data, farmer_id=None, farmer_name=None):
    payload = dict(data)
    if farmer_id:
        payload['farmer_id'] = farmer_id
    if farmer_name:
        payload['farmer_name'] = farmer_name
    if 'id' not in payload or not payload['id']:
        payload['id'] = 'l' + str(__import__('time').time()).replace('.', '')
    if 'status' not in payload:
        payload['status'] = 'active'
    if 'is_flagged' not in payload:
        payload['is_flagged'] = False
    if 'rating' not in payload:
        payload['rating'] = 0
    if 'review_count' not in payload:
        payload['review_count'] = 0
    if 'created_at' not in payload:
        payload['created_at'] = datetime.utcnow().isoformat()
    return payload


class LivestockListResource(Resource):
    def get(self):
        search = request.args.get('search', '').strip().lower()
        status = request.args.get('status', '').strip().lower()
        farmer_id = request.args.get('farmerId', '').strip()
        flagged_only = request.args.get('flaggedOnly', '').lower() == 'true'
        listing_type = request.args.get('type', '').strip().lower()

        query = Livestock.query

        if search:
            query = query.filter(
                db.or_(
                    Livestock.title.ilike(f'%{search}%'),
                    Livestock.breed.ilike(f'%{search}%'),
                    Livestock.location.ilike(f'%{search}%'),
                    Livestock.farmer_name.ilike(f'%{search}%'),
                )
            )

        if status:
            query = query.filter(Livestock.status == status)

        if farmer_id:
            query = query.filter(Livestock.farmer_id == farmer_id)

        if flagged_only:
            query = query.filter(Livestock.is_flagged.is_(True))

        if listing_type:
            query = query.filter(Livestock.type == listing_type)

        listings = query.order_by(Livestock.created_at.desc()).all()
        return livestock_list_schema.dump(listings), 200

    def post(self):
        json_data = request.get_json() or {}
        data = _build_listing_payload(json_data)
        errors = livestock_schema.validate(data)
        if errors:
            return {'message': 'Validation error', 'errors': errors}, 400

        listing = Livestock(
            id=data['id'],
            type=data['type'],
            breed=data['breed'],
            title=data['title'],
            description=data.get('description'),
            price=data['price'],
            quantity=data['quantity'],
            age=data.get('age'),
            gender=data.get('gender'),
            weight=data.get('weight'),
            weight_unit=data.get('weight_unit', 'kg'),
            location=data.get('location'),
            farmer_id=data.get('farmer_id'),
            farmer_name=data.get('farmer_name'),
            images=data.get('images'),
            status=data.get('status', 'active'),
            is_flagged=data.get('is_flagged', False),
            flag_reason=data.get('flag_reason'),
            rating=data.get('rating', 0),
            review_count=data.get('review_count', 0),
            created_at=datetime.utcnow() if isinstance(data.get('created_at'), str) else data.get('created_at', datetime.utcnow()),
        )
        db.session.add(listing)
        db.session.commit()
        return livestock_schema.dump(listing), 201


class LivestockResource(Resource):
    def get(self, listing_id):
        listing = Livestock.query.get(listing_id)
        if not listing:
            return {'message': 'Listing not found'}, 404
        return livestock_schema.dump(listing), 200

    def put(self, listing_id):
        listing = Livestock.query.get(listing_id)
        if not listing:
            return {'message': 'Listing not found'}, 404

        json_data = request.get_json() or {}
        errors = livestock_schema.validate(json_data, partial=True)
        if errors:
            return {'message': 'Validation error', 'errors': errors}, 400

        for key, value in json_data.items():
            if hasattr(listing, key):
                setattr(listing, key, value)

        db.session.commit()
        return livestock_schema.dump(listing), 200

    def delete(self, listing_id):
        listing = Livestock.query.get(listing_id)
        if not listing:
            return {'message': 'Listing not found'}, 404
        db.session.delete(listing)
        db.session.commit()
        return {'message': 'Listing deleted'}, 200
