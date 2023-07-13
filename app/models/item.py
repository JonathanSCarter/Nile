from .db import db, environment, SCHEMA, add_prefix_for_prod

class Item(db.Model):
  __tablename__ = 'items'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  seller = db.Column(db.String(40))
  rating = db.Column(db.Float(2))
  price = db.Column(db.Float(7))
  name = db.Column(db.String(200))
  discount = db.Column(db.Integer)
  img = db.Column(db.String(400))
  description = db.Column(db.String(1000))
  category = db.Column(db.String(100))

  cart = db.relationship("Cart", back_populates="item")

  @property

  def to_dict(self):
    return {
      'id': self.id,
      'seller': self.seller,
      "name": self.name,
      "description": self.description
    }
