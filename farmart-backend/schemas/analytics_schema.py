from marshmallow import fields, Schema, validate


class AnalyticsSchema(Schema):
    id = fields.Integer(
        dump_only=True,
    )

    farmer_id = fields.Integer(
        required=True,
        validate=validate.Range(min=1),
    )

    total_views = fields.Integer(
        required=True,
        validate=validate.Range(min=0),
    )

    total_listings = fields.Integer(
        required=True,
        validate=validate.Range(min=0),
    )

    total_sales = fields.Integer(
        required=True,
        validate=validate.Range(min=0),
    )

    total_revenue = fields.Decimal(
        required=True,
        as_string=True,
        places=2,
        validate=validate.Range(min=0),
    )

    created_at = fields.DateTime(
        dump_only=True,
    )

    updated_at = fields.DateTime(
        dump_only=True,
    )