from .db import db, environment, SCHEMA, add_prefix_for_prod

class Item(db.Model):
  __tablename__ = 'items'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  seller = db.Column(db.String(40), nullable=False)
  rating = db.Column(db.Float(2), default=5)
  price = db.Column(db.Float(7), nullable=False)
  name = db.Column(db.String(200), nullable=False)
  discount = db.Column(db.Integer, default=0)
  image = db.Column(db.String)
  description = db.Column(db.String(1000), nullable=False)
  category = db.Column(db.String(100), nullable=False) #Make this an Enum later when you add categories
  seller_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

  cart = db.relationship("Cart", back_populates="item")
  user = db.relationship("User", back_populates="item")

  @property

  def to_dict(self):
    return {
      'id': self.id,
      'seller': self.seller,
      "name": self.name,
      "description": self.description,
      "image": self.image,
      "price": self.price,
      "rating": self.rating,
      'seller_id': self.seller_id,
      "category": self.category,
      "discount": self.discount
    }
