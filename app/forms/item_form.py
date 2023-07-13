from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, IntegerField
from wtforms.validators import URL, DataRequired, Length, ValidationError

class ItemForm(FlaskForm):
  price = DecimalField("price", places=2, validators=[DataRequired()])
  name = StringField("name", validators=[DataRequired(), Length(max=200)])
  discount = IntegerField('discount')
  img = StringField('img')
  description = StringField('description', validators=[Length(max=1000)])
  category = StringField('category', validators=[Length(max=100)])
