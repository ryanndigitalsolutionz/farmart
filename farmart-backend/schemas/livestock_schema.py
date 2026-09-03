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
        "farmerId": "farmer_id",
        "healthStatus": "health_status",
        "lastCheckup": "last_checkup",
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

    created_at = fields.DateTime(
        dump_only=True
    )

    updated_at = fields.DateTime(
        dump_only=True
    )


class LivestockSchema(BaseSchema):
    farmer_id = fields.Integer(
        dump_only=True
    )

    name = fields.String(
        required=False,
        allow_none=True,
        validate=validate.Length(max=100)
    )

    type = fields.String(
        required=True,
        validate=validate.Length(max=50)
    )

    breed = fields.String(
        required=False,
        allow_none=True,
        validate=validate.Length(max=50)
    )

    age = fields.Integer(
        required=False,
        allow_none=True,
        validate=validate.Range(min=0)
    )

    sex = fields.String(
        required=False,
        allow_none=True,
        validate=validate.Length(max=10)
    )

    weight = fields.Decimal(
        required=True,
        as_string=True,
        places=2,
        validate=validate.Range(min=0)
    )

    location = fields.String(
        required=True,
        validate=validate.Length(max=100)
    )

    price = fields.Decimal(
        required=True,
        as_string=True,
        places=2,
        validate=validate.Range(min=0)
    )

    image = fields.String(
        required=False,
        allow_none=True
    )

    description = fields.String(
        required=False,
        allow_none=True
    )

    availability = fields.String(
        required=False,
        allow_none=True
    )

    health_status = fields.String(
        required=False,
        allow_none=True,
        validate=validate.Length(max=50)
    )

    vaccinated = fields.Boolean(
        required=False,
        allow_none=True
    )

    last_checkup = fields.Date(
        required=False,
        allow_none=True
    )

    @pre_load
    def normalize_keys(self, data, **kwargs):
        return _convert_camel_to_snake(data)
