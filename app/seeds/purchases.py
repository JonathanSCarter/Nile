from app.models import db, Purchase, environment, SCHEMA
from sqlalchemy.sql import text

def seed_purchases():
  order_1 = Purchase(
    user_id=1, item_name='Shower Curtain', count=2
  )
  order_2 = Purchase(
    user_id=1, item_name='Wall Clock', count=5
  )
  order_3 = Purchase(
    user_id=1, item_name="Electric Blanket", count=1,
  )

  db.session.add(order_1)
  db.session.add(order_2)
  db.session.add(order_3)

  db.session.commit()

def undo_purchases():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.purchases RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM purchases"))

  db.session.commit()
