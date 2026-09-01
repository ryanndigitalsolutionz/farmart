from marshmallow import (
    RAISE,
    Schema,
    fields,
    validate,
    pre_load,
)

from models import OrderStatus


def _convert_camel_to_snake(data):
    if not isinstance(data, dict):
        return data

    replacements = {
        "buyerId": "buyer_id",
        "livestockId": "livestock_id",
        "createdAt": "created_at",
        
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


class OrderSchema(BaseSchema):
    buyer_id = fields.Integer(
        dump_only=True,
    )

    total_amount = fields.Decimal(
        dump_only=True,
        as_string=True,
        places=2,
        validate=validate.Range(min=0),
    )
    
    status = fields.String(
        dump_only=True,
    )

    @pre_load
    def normalize_keys(self, data, **kwargs):
        return _convert_camel_to_snake(data)
