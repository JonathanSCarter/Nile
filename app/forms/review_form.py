from flask_wtf import FlaskForm
from wtforms import StringField,  IntegerField
from wtforms.validators import Length, NumberRange, DataRequired

class ReviewForm(FlaskForm):
  message = StringField("message", validators=[Length(max=500, message="Review must be under 500 characters")])
  rating = IntegerField("rating", validators=[DataRequired(), NumberRange(min=1, max=5, message="Rating must be between 0 and 5")])
