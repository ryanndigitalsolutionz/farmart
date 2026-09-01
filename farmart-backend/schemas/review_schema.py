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
        "buyerId": "buyer_id",
        "livestockId": "livestock_id",
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


class ReviewSchema(BaseSchema):
    buyer_id = fields.Integer(
        dump_only=True,
    )
    livestock_id = fields.Integer(
        required=True,
        validate=validate.Range(min=1),
    )
    rating = fields.String(
        required=True,
        validate=validate.Range(min=1, max=5),
    )
    comment = fields.String(
        required=True,
        allow_none=True,
        validate=validate.Length(max=1000),
    )

    @pre_load
    def normalize_keys(self, data, **kwargs):
         return _convert_camel_to_snake(data)