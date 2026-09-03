from flask import request
from flask_restful import Resource
from extensions import db
from models.report import Report
from schemas.report_schema import report_schema, reports_schema


class ReportListResource(Resource):
    def get(self):
        reports = Report.query.order_by(Report.created_at.desc()).all()
        return reports_schema.dump(reports), 200

    def post(self):
        data = request.get_json()
        reporter_id = data.get("reporter_id")
        livestock_id = data.get("livestock_id")
        reason = data.get("reason")
        description = data.get("description")

        if not reporter_id or not livestock_id or not reason:
            return {"error": "reporter_id, livestock_id, and reason are required"}, 400

        report = Report(
            reporter_id=reporter_id,
            livestock_id=livestock_id,
            reason=reason,
            description=description,
        )
        db.session.add(report)
        db.session.commit()

        return report_schema.dump(report), 201


class ReportResource(Resource):
    def get(self, report_id):
        report = Report.query.get_or_404(report_id)
        return report_schema.dump(report), 200

    def patch(self, report_id):
        report = Report.query.get_or_404(report_id)
        data = request.get_json()

        if "status" in data:
            report.status = data["status"]

        db.session.commit()
        return report_schema.dump(report), 200

    def delete(self, report_id):
        report = Report.query.get_or_404(report_id)
        db.session.delete(report)
        db.session.commit()
        return {"message": "Report deleted"}, 200