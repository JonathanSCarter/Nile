from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, IntegerField
from wtforms.validators import URL, DataRequired, Length, ValidationError, NumberRange
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.s3_helpers import ALLOWED_EXTENSIONS

class ItemForm(FlaskForm):
  price = DecimalField("price", places=2, validators=[DataRequired()])
  name = StringField("name", validators=[DataRequired(), Length(max=200, min=3)])
  discount = IntegerField('discount', validators=[NumberRange(min=0, max=100)])
  description = StringField('description', validators=[Length(max=1000)])
  category = StringField('category', validators=[Length(max=100)])
  image = FileField("image", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
  seller_id = IntegerField("seller_id", validators=[DataRequired()])
