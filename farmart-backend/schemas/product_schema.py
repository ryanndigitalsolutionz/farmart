from marshmallow import RAISE, Schema, fields, validate, pre_load


def _convert_camel_to_snake(data):
    if not isinstance(data, dict):
        return data

    replacements = {
        "farmerId": "farmer_id",
        "dateProduced": "date_produced",
        "expiryDate": "expiry_date",
        "createdAt": "created_at",
        "updatedAt": "updated_at",
    }

    return {
        replacements.get(k, k): _convert_camel_to_snake(v)
        for k, v in data.items()
    }


class ProductSchema(Schema):
    class Meta:
        unknown = RAISE

    id = fields.Integer(
        dump_only=True,
    )

    farmer_id = fields.Integer(
        required=True,
        validate=validate.Range(min=1),
    )

    name = fields.String(
        required=True,
        validate=validate.Length(min=1),
    )

    type = fields.String(
        required=True,
        validate=validate.Length(min=1),
    )

    description = fields.String(
        required=True,
        validate=validate.Length(min=1),
    )

    price = fields.Decimal(
        required=True,
        as_string=True,
        places=2,
        validate=validate.Range(min=0),
    )

    quantity = fields.Decimal(
        required=True,
        as_string=True,
        places=2,
        validate=validate.Range(min=0),
    )

    unit = fields.String(
        required=True,
        validate=validate.Length(min=1),
    )

    date_produced = fields.Date(
        required=True,
    )

    expiry_date = fields.Date(
        required=True,
    )

    location = fields.String(
        required=True,
        validate=validate.Length(min=1),
    )

    image = fields.String(
        allow_none=True,
    )

    availability = fields.String(
        load_default="available",
    )

    created_at = fields.DateTime(
        dump_only=True,
    )

    updated_at = fields.DateTime(
        dump_only=True,
    )

    @pre_load
    def normalize_keys(self, data, **kwargs):
        return _convert_camel_to_snake(data)
