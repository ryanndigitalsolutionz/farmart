from marshmallow import RAISE, Schema, fields, validate, pre_load

from models.order import OrderStatus


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


class OrderItemSchema(Schema):
    id = fields.Integer(dump_only=True)
    livestock_id = fields.Integer(allow_none=True)
    product_id = fields.Integer(allow_none=True)
    quantity = fields.Integer(required=True)
    unit_price = fields.Decimal(as_string=True, places=2)
    subtotal = fields.Decimal(as_string=True, places=2)


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
    )

    status = fields.Enum(
        OrderStatus,
        by_value=True,
        dump_only=True,
    )

    items = fields.Nested(
        OrderItemSchema,
        many=True,
        dump_only=True,
    )

    @pre_load
    def normalize_keys(self, data, **kwargs):
        return _convert_camel_to_snake(data)
