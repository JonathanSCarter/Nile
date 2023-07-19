from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, IntegerField
from wtforms.validators import URL, DataRequired, Length, NumberRange

class ItemImagelessForm(FlaskForm):
  price = DecimalField("price", places=2, validators=[DataRequired(message="Price is required.")])
  name = StringField("name", validators=[DataRequired(message="Name is required"), Length(max=200, min=3, message="Length must be between 3 and 200 characters")])
  discount = IntegerField('discount', validators=[NumberRange(min=0, max=100, message="Discount must be between 0 and 100")])
  description = StringField('description', validators=[Length(max=1000, message="Description must be less than 1000 characters")])
  category = StringField('category', validators=[Length(max=100, message="Category must be less than 100 characters")])
