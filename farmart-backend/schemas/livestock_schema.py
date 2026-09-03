from marshmallow import RAISE, Schema, fields, validate, pre_load


def _convert_camel_to_snake(data):
    if not isinstance(data, dict):
        return data

    replacements = {
        "farmerId": "farmer_id",
        "weightUnit": "weight_unit",
        "healthInformation": "health_information",
        "createdAt": "created_at",
        "updatedAt": "updated_at",
    }

    return {
        replacements.get(k, k): _convert_camel_to_snake(v)
        for k, v in data.items()
    }


class LivestockSchema(Schema):
    class Meta:
        unknown = RAISE

    id = fields.Integer(
        dump_only=True,
    )

    farmer_id = fields.Integer(
        dump_only=True,
    )

    name = fields.String(
        required=True,
        validate=validate.Length(min=1),
    )

    type = fields.String(
        required=True,
        validate=validate.Length(min=1),
    )

    breed = fields.String(
        required=True,
        validate=validate.Length(min=1),
    )

    age = fields.Integer(
        required=True,
        validate=validate.Range(min=0),
    )

    sex = fields.String(
        required=True,
        validate=validate.Length(min=1),
    )

    weight = fields.Decimal(
        allow_none=True,
        as_string=True,
        places=2,
        validate=validate.Range(min=0),
    )

    weight_unit = fields.String(
        allow_none=True,
    )

    location = fields.String(
        required=True,
        validate=validate.Length(min=1),
    )

    price = fields.Decimal(
        required=True,
        as_string=True,
        places=2,
        validate=validate.Range(min=0),
    )

    quantity = fields.Integer(
        required=True,
        validate=validate.Range(min=1),
    )

    image = fields.String(
        allow_none=True,
    )

    description = fields.String(
        required=True,
        validate=validate.Length(min=1),
    )

    health_information = fields.String(
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
