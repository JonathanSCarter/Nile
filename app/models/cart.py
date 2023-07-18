from .db import db, environment, SCHEMA, add_prefix_for_prod

class Cart(db.Model):
  __tablename__ = 'carts'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
  item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("items.id")), nullable=False)
  count = db.Column(db.Integer, nullable=False)
  purchased = db.Column(db.Boolean, nullable=False, default=False, index=True)
  purchased_at = db.Column(db.DateTime, default=None, index=True)

  user = db.relationship("User", back_populates="cart")
  item = db.relationship("Item", back_populates="cart")

  @property

  def to_dict(self):
    return {
      'id': self.id,
      'item_id': self.item_id,
      'count': self.count,
      'purchased': self.purchased,
      'item': {
        'name': self.item.name,
        'image': self.item.image,
        'price': self.item.price,
        'discount': self.item.discount
      },
      'purchased_at': self.purchased_at
    }
