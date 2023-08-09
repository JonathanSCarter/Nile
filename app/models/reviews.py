from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
  __tablename__ = 'reviews'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  rating = db.Column(db.Integer, nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
  message = db.Column(db.String(500))
  item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("items.id")), nullable=False)

  item = db.relationship("Item", back_populates="reviews")
  user = db.relationship("User", back_populates="review")

  @property

  def to_dict(self):
    return {
      'id': self.id,
      'rating': self.rating,
      'message': self.message,
      'name': f'{self.user.first_name} {self.user.last_name}',
      'user_id': self.user_id
    }
