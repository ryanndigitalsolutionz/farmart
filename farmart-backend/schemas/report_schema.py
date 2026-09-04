from extensions import ma
from models.report import Report


class ReportSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Report
        load_instance = True
        include_fk = True


report_schema = ReportSchema()
reports_schema = ReportSchema(many=True)