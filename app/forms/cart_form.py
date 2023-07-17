from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import  DataRequired

class CartForm(FlaskForm):
  item_id = IntegerField("item_id", validators=[DataRequired()])
  count = IntegerField("count", validators=[DataRequired()])
