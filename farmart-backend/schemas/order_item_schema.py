from marshmallow import RAISE, Schema, fields, validate, validates_schema, ValidationError, pre_load


def _convert_camel_to_snake(data):
    if not isinstance(data, dict):
        return data

    replacements = {
        "orderId": "order_id",
        "livestockId": "livestock_id",
        "productId": "product_id",
        "unitPrice": "unit_price",
    }

    return {
        replacements.get(k, k): _convert_camel_to_snake(v)
        for k, v in data.items()
    }


class OrderItemSchema(Schema):
    class Meta:
        unknown = RAISE

    id = fields.Integer(
        dump_only=True,
    )

    order_id = fields.Integer(
        required=True,
        validate=validate.Range(min=1),
    )

    livestock_id = fields.Integer(
        allow_none=True,
        validate=validate.Range(min=1),
    )

    product_id = fields.Integer(
        allow_none=True,
        validate=validate.Range(min=1),
    )

    quantity = fields.Integer(
        required=True,
        validate=validate.Range(min=1),
    )

    unit_price = fields.Decimal(
        required=True,
        as_string=True,
        places=2,
        validate=validate.Range(min=0),
    )

    subtotal = fields.Decimal(
        required=True,
        as_string=True,
        places=2,
        validate=validate.Range(min=0),
    )

    @validates_schema
    def validate_item_reference(self, data, **kwargs):
        livestock_id = data.get("livestock_id")
        product_id = data.get("product_id")

        if livestock_id and product_id:
            raise ValidationError(
                "An order item cannot reference both livestock and product."
            )

        if not livestock_id and not product_id:
            raise ValidationError(
                "An order item must reference livestock or product."
            )

    @pre_load
    def normalize_keys(self, data, **kwargs):
        return _convert_camel_to_snake(data)
