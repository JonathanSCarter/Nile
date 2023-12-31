from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .db import db, environment, SCHEMA

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  first_name = db.Column(db.String(40), nullable=False)
  last_name = db.Column(db.String(40), nullable=False)
  email = db.Column(db.String(255), nullable=False, unique=True)
  hashed_password = db.Column(db.String(255), nullable=False)

  cart = db.relationship("Cart", back_populates="user")
  item = db.relationship("Item", back_populates="user")
  purchase = db.relationship("Purchase", back_populates="user")
  review = db.relationship("Review", back_populates="user")


  @property
  def password(self):
    return self.hashed_password

  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)

  def check_password(self, password):
    return check_password_hash(self.password, password)

  def to_dict(self):
    return {
      'id': self.id,
      'email': self.email,
      'first_name': self.first_name,
      'last_name': self.last_name
    }
