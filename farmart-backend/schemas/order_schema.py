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
        "totalAmount": "total_amount",
        "createdAt": "created_at",
        "updatedAt": "updated_at",
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
    buyer_name = fields.Method("get_buyer_name", dump_only=True)
    total_amount = fields.Decimal(
        required=True,
        as_string=True, 
        validate=validate.Range(min=0)
    )
    status = fields.Enum(
        OrderStatus, 
        by_value=True, 
        required=True,
    )

    def get_buyer_name(self, obj):
        if obj.buyer:
            return f"{obj.buyer.first_name} {obj.buyer.last_name}"
        return None

    @pre_load
    def normalize_keys(self, data, **kwargs):
        return _convert_camel_to_snake(data)