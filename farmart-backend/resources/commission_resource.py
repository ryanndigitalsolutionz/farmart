from flask import request
from flask_restful import Resource

from extensions import db
from models.platform_settings import PlatformSettings
from resources.auth_utils import require_admin


class CommissionRateResource(Resource):
    def get(self):
        error = require_admin()
        if error:
            return error

        settings = PlatformSettings.get_singleton()
        return {"percentage": float(settings.commission_rate)}, 200

    def patch(self):
        error = require_admin()
        if error:
            return error

        data = request.get_json() or {}
        percentage = data.get("percentage")

        if percentage is None:
            return {"message": "percentage is required"}, 400

        try:
            percentage = float(percentage)
        except (TypeError, ValueError):
            return {"message": "percentage must be a number"}, 400

        if percentage < 0 or percentage > 100:
            return {"message": "percentage must be between 0 and 100"}, 400

        settings = PlatformSettings.get_singleton()
        settings.commission_rate = percentage
        db.session.commit()

        return {"percentage": float(settings.commission_rate)}, 200
