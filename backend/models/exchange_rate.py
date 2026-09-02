from extensions import db
from datetime import datetime


class ExchangeRate(db.Model):
    __tablename__ = 'exchange_rate'

    id = db.Column(db.String(36), primary_key=True)
    from_currency = db.Column(db.String(10), nullable=False)
    to_currency = db.Column(db.String(10), nullable=False)
    rate = db.Column(db.Float, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'fromCurrency': self.from_currency,
            'toCurrency': self.to_currency,
            'rate': self.rate,
            'updatedAt': self.updated_at.isoformat() if self.updated_at else None,
        }
