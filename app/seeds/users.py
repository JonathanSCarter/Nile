from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_users():
  demo = User(
    first_name='Demo', last_name='User', email='demo@aa.io', password='password')
  amazon = User(
    first_name = 'Nile', last_name='Company', email='nile@aa.io', password='password'
  )


  db.session.add(demo)
  db.session.add(amazon)

  db.session.commit()


def undo_users():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM users"))

  db.session.commit()
