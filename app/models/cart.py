from .db import db, environment, SCHEMA, add_prefix_for_prod

class Cart(db.Model):
  __tablename__ = 'carts'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
  item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("items.id")), nullable=False)
  count = db.Column(db.Integer, nullable=False)
  purchased = db.Column(db.Boolean, nullable=False)

  user = db.relationship("User", back_populates="cart")
  item = db.relationship("Item", back_populates="cart")