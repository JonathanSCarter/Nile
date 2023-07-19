from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
class Purchase(db.Model):
  __tablename__ = 'purchases'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
  count = db.Column(db.Integer, nullable=False)
  purchased_at = db.Column(db.DateTime, default=datetime.now(), index=True)
  item_name = db.Column(db.String(200))
  user = db.relationship("User", back_populates="purchase")

  @property

  def to_dict(self):
    return {
      'id': self.id,
      'count': self.count,
      'purchased_at': self.purchased_at,
      'item_name': self.item_name
    }
