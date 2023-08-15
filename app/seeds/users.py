from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_users():
  demo = User(
    first_name='Demo', last_name='User', email='demo@aa.io', password='password')
  nile = User(
    first_name = 'Nile', last_name='Company', email='nile@aa.io', password='password'
  )
  review_user_one = User(
    first_name = "Frederick", last_name="Calhoun", email='fcalhoun@aa.io', password='password'
  )
  review_user_two = User(
    first_name = "Lily", last_name="Manrodt", email='lmanrodt@aa.io', password='password'
  )
  review_user_three = User(
    first_name = "Patrick", last_name="Lanier", email='planier@aa.io', password='password'
  )
  review_user_four = User(
    first_name = "Ava", last_name="Scott", email='escott@aa.io', password='password'
  )


  db.session.add(demo)
  db.session.add(nile)
  db.session.add(review_user_one)
  db.session.add(review_user_two)
  db.session.add(review_user_three)
  db.session.add(review_user_four)
  db.session.commit()


def undo_users():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM users"))

  db.session.commit()
