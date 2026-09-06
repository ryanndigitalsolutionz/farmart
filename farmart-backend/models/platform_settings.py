from datetime import datetime

from extensions import db


class PlatformSettings(db.Model):
    """Single-row table holding platform-wide admin settings."""

    __tablename__ = "platform_settings"

    id = db.Column(db.Integer, primary_key=True)
    commission_rate = db.Column(db.Numeric(5, 2), nullable=False, default=10.0)
    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )

    @classmethod
    def get_singleton(cls):
        settings = cls.query.first()

        if not settings:
            settings = cls(commission_rate=10.0)
            db.session.add(settings)
            db.session.commit()

        return settings
