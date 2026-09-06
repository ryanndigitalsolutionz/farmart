from flask import request
from flask_restful import Resource

from extensions import db
from models.product import Product
from schemas.product_schema import ProductSchema

product_schema = ProductSchema()
products_schema = ProductSchema(many=True)


class ProductResource(Resource):

    def get(self, product_id=None):
        if product_id:
            product = db.session.get(Product, product_id)

            if not product:
                return {"message": "Product not found"}, 404

            return product_schema.dump(product), 200

        products = Product.query.all()

        return products_schema.dump(products), 200

    def post(self):
        data = request.get_json() or {}

        try:
            product_data = product_schema.load(data)

            product = Product(**product_data)

            db.session.add(product)
            db.session.commit()

            return {
                "message": "Product listing created successfully",
                "product": product_schema.dump(product),
            }, 201

        except Exception as error:
            db.session.rollback()

            return {
                "message": "Unable to create product listing",
                "error": str(error),
            }, 400

    def put(self, product_id):
        product = db.session.get(Product, product_id)

        if not product:
            return {"message": "Product not found"}, 404

        data = request.get_json() or {}

        try:
            product_data = product_schema.load(
                data,
                partial=True,
            )

            for key, value in product_data.items():
                setattr(product, key, value)

            db.session.commit()

            return {
                "message": "Product listing updated successfully",
                "product": product_schema.dump(product),
            }, 200

        except Exception as error:
            db.session.rollback()

            return {
                "message": "Unable to update product listing",
                "error": str(error),
            }, 400

    def delete(self, product_id):
        product = db.session.get(Product, product_id)

        if not product:
            return {"message": "Product not found"}, 404

        db.session.delete(product)
        db.session.commit()

        return {
            "message": "Product listing deleted successfully",
        }, 200
