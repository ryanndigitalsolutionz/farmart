from marshmallow import RAISE, Schema, fields, validate, pre_load

def _convert_camel_to_snake(data):
    if not isinstance(data, dict):
        return data

    replacements = {
        "orderId": "order_id",
        "farmerId": "farmer_id",
    }

    return {
        replacements.get(k, k): _convert_camel_to_snake(v)
        for k, v in data.items()
    }

class BaseSchema(Schema):
    class Meta:
        unknown = RAISE

    id = fields.Integer(dump_only=True)
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)

class RevenueRecordSchema(BaseSchema):
    order_id = fields.Integer(
        required=True,
        validate=validate.Range(min=1),
    )
    farmer_id = fields.Integer(
        required=False,
        allow_none=True,
        validate=validate.Range(min=1),
    )
    amount = fields.Decimal(
        required=True,
        as_string=True,
        places=2,
    )
    description = fields.String(
        required=False,
        allow_none=True,
        validate=validate.Length(max=255),
    )

    @pre_load
    def normalize_keys(self, data, **kwargs):
        return _convert_camel_to_snake(data)