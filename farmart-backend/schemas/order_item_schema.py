from marshmallow import (
    RAISE,
    Schema,
    fields,
    validate,
    pre_load,
)

def _convert_camel_to_snake(data):
    if not isinstance(data, dict):
        return data

    replacements = {
        "orderId": "order_id",
        "livestockId": "livestock_id",
        "unitPrice": "unit_price",
    }

    return {
        replacements.get(k, k): _convert_camel_to_snake(v)
        for k, v in data.items()
    }
class BaseSchema(Schema):
    class Meta:
        unknown = RAISE

    id = fields.Integer(dump_only=True)


class OrderItemSchema(BaseSchema):
    order_id = fields.Integer(
        dump_only=True,
    )
    livestock_id = fields.Integer(
        required=True, 
        validate=validate.Range(min=1),
    )
    quantity = fields.Integer(
        required=True, 
        validate=validate.Range(min=1),
    )
    unit_price = fields.Decimal(
        dump_only=True,
        as_string=True,
        places=2, 
        validate=validate.Range(min=0),
    )
    subtotal = fields.Decimal(
        dump_only=True,
        as_string=True,
        places=2, 
        validate=validate.Range(min=0),
    )
    

    @pre_load
    def normalize_keys(self, data, **kwargs):
        return _convert_camel_to_snake(data)