from extensions import ma
from models.announcement import Announcement


class AnnouncementSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Announcement
        load_instance = True
        include_fk = True


announcement_schema = AnnouncementSchema()
announcements_schema = AnnouncementSchema(many=True)