from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import  DataRequired

class CartCountForm(FlaskForm):
  count = IntegerField("count", validators=[DataRequired()])
