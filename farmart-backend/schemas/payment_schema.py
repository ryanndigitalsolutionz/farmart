from marshmallow import (
    RAISE,
    Schema,
    fields,
    validate,
    pre_load,
)

from models.payment import PaymentMethod, PaymentStatus


def _convert_camel_to_snake(data):
    if not isinstance(data, dict):
        return data

    replacements = {
        "orderId": "order_id",
        "cardLast4": "card_last4",
        "transactionId": "transaction_id",
        "checkoutRequestId": "checkout_request_id",
        "merchantRequestId": "merchant_request_id",
        "paidAt": "paid_at",
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

    id = fields.Integer(
        dump_only=True,
    )

    created_at = fields.DateTime(
        dump_only=True,
    )

    updated_at = fields.DateTime(
        dump_only=True,
    )


class PaymentSchema(BaseSchema):
    order_id = fields.Integer(
        required=True,
        validate=validate.Range(min=1),
    )

    amount = fields.Decimal(
        dump_only=True,
        as_string=True,
        places=2,
    )

    method = fields.Enum(
        PaymentMethod,
        by_value=True,
        dump_only=True,
    )

    card_last4 = fields.String(
        dump_only=True,
    )

    status = fields.Enum(
        PaymentStatus,
        by_value=True,
        dump_only=True,
    )

    transaction_id = fields.String(
        dump_only=True,
    )

    checkout_request_id = fields.String(
        dump_only=True,
    )

    merchant_request_id = fields.String(
        dump_only=True,
    )

    paid_at = fields.DateTime(
        dump_only=True,
    )

    @pre_load
    def normalize_keys(self, data, **kwargs):
        return _convert_camel_to_snake(data)
