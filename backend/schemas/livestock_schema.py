from marshmallow import Schema, fields, validate, pre_load, post_dump


class LivestockSchema(Schema):
    id = fields.String(load_default=None)
    type = fields.String(required=True, validate=validate.OneOf([
        'cattle', 'goat', 'sheep', 'poultry', 'dairy', 'product'
    ]))
    breed = fields.String(required=True)
    title = fields.String(required=True)
    description = fields.String(load_default=None)
    price = fields.Float(required=True, validate=validate.Range(min=0))
    quantity = fields.Integer(required=True, validate=validate.Range(min=1))
    age = fields.String(load_default=None)
    gender = fields.String(load_default=None, validate=validate.OneOf(['male', 'female', 'mixed']))
    weight = fields.Float(load_default=None, validate=validate.Range(min=0))
    weight_unit = fields.String(load_default='kg')
    location = fields.String(load_default=None)
    farmer_id = fields.String(load_default=None)
    farmer_name = fields.String(load_default=None)
    images = fields.String(load_default=None)
    status = fields.String(load_default='active', validate=validate.OneOf([
        'active', 'pending_review', 'sold', 'inactive'
    ]))
    is_flagged = fields.Boolean(load_default=False)
    flag_reason = fields.String(load_default=None)
    rating = fields.Float(load_default=0, validate=validate.Range(min=0, max=5))
    review_count = fields.Integer(load_default=0, validate=validate.Range(min=0))
    created_at = fields.String(load_default=None)

    @pre_load
    def process_images(self, data, **kwargs):
        if 'images' in data and isinstance(data['images'], list):
            data['images'] = ','.join(data['images'])
        return data

    @post_dump
    def split_images(self, data, **kwargs):
        if 'images' in data and data['images']:
            data['images'] = data['images'].split(',')
        else:
            data['images'] = []
        return data
