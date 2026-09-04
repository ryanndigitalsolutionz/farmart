from flask import request
from flask_restful import Resource
from extensions import db
from models.announcement import Announcement
from schemas.announcement_schema import announcement_schema, announcements_schema


class AnnouncementListResource(Resource):
    def get(self):
        announcements = Announcement.query.order_by(Announcement.created_at.desc()).all()
        return announcements_schema.dump(announcements), 200

    def post(self):
        data = request.get_json()
        author_id = data.get("author_id")
        title = data.get("title")
        message = data.get("message")

        if not author_id or not title or not message:
            return {"error": "author_id, title, and message are required"}, 400

        announcement = Announcement(author_id=author_id, title=title, message=message)
        db.session.add(announcement)
        db.session.commit()

        return announcement_schema.dump(announcement), 201


class AnnouncementResource(Resource):
    def get(self, announcement_id):
        announcement = Announcement.query.get_or_404(announcement_id)
        return announcement_schema.dump(announcement), 200

    def delete(self, announcement_id):
        announcement = Announcement.query.get_or_404(announcement_id)
        db.session.delete(announcement)
        db.session.commit()
        return {"message": "Announcement deleted"}, 200