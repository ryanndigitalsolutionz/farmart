from marshmallow import Schema, fields, validate


class ExchangeRateSchema(Schema):
    id = fields.String(load_default=None)
    from_currency = fields.String(required=True, validate=validate.Length(min=2, max=10))
    to_currency = fields.String(required=True, validate=validate.Length(min=2, max=10))
    rate = fields.Float(required=True, validate=validate.Range(min=0))
    updated_at = fields.String(load_default=None)
