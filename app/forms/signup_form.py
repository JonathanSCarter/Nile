from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
  # Checking if user exists
  email = field.data
  user = User.query.filter(User.email == email).first()
  if user:
    raise ValidationError('Email address is already in use.')

def validate_email_length(form, field):
    email = field.data
    username = email.split('@')[0]
    if len(username) < 6:
        raise ValidationError('Email username must be at least 6 characters.')

class SignUpForm(FlaskForm):
  first_name=StringField('first_name', validators=[DataRequired()])
  last_name=StringField('last_name', validators=[DataRequired()])
  email = StringField('email', validators=[DataRequired(), Email(), user_exists, validate_email_length])
  password = StringField('password', validators=[DataRequired(), Length(min=8)])
