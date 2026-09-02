from flask import request
from flask_restful import Resource
from models.exchange_rate import ExchangeRate
from schemas.exchange_rate_schema import ExchangeRateSchema
from extensions import db
from datetime import datetime


exchange_rate_schema = ExchangeRateSchema()
exchange_rate_list_schema = ExchangeRateSchema(many=True)


class ExchangeRateListResource(Resource):
    def get(self):
        from_currency = request.args.get('fromCurrency', '').strip().upper()
        to_currency = request.args.get('toCurrency', '').strip().upper()

        query = ExchangeRate.query
        if from_currency:
            query = query.filter(ExchangeRate.from_currency == from_currency)
        if to_currency:
            query = query.filter(ExchangeRate.to_currency == to_currency)

        rates = query.order_by(ExchangeRate.updated_at.desc()).all()
        return exchange_rate_list_schema.dump(rates), 200

    def post(self):
        json_data = request.get_json() or {}
        errors = exchange_rate_schema.validate(json_data)
        if errors:
            return {'message': 'Validation error', 'errors': errors}, 400

        data = json_data
        rate_id = data.get('id') or 'er' + str(__import__('time').time()).replace('.', '')
        rate = ExchangeRate(
            id=rate_id,
            from_currency=data['from_currency'].upper(),
            to_currency=data['to_currency'].upper(),
            rate=data['rate'],
            updated_at=datetime.utcnow(),
        )
        db.session.add(rate)
        db.session.commit()
        return exchange_rate_schema.dump(rate), 201


class ExchangeRateResource(Resource):
    def get(self, rate_id):
        rate = ExchangeRate.query.get(rate_id)
        if not rate:
            return {'message': 'Exchange rate not found'}, 404
        return exchange_rate_schema.dump(rate), 200

    def put(self, rate_id):
        rate = ExchangeRate.query.get(rate_id)
        if not rate:
            return {'message': 'Exchange rate not found'}, 404

        json_data = request.get_json() or {}
        errors = exchange_rate_schema.validate(json_data, partial=True)
        if errors:
            return {'message': 'Validation error', 'errors': errors}, 400

        for key, value in json_data.items():
            if key in ('from_currency', 'to_currency'):
                value = value.upper()
            if hasattr(rate, key):
                setattr(rate, key, value)

        db.session.commit()
        return exchange_rate_schema.dump(rate), 200

    def delete(self, rate_id):
        rate = ExchangeRate.query.get(rate_id)
        if not rate:
            return {'message': 'Exchange rate not found'}, 404
        db.session.delete(rate)
        db.session.commit()
        return {'message': 'Exchange rate deleted'}, 204
