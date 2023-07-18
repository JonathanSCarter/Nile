from app.models import db, Cart, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime
def seed_carts():
  order_1 = Cart(
    user_id=1, item_id=2, count=2, purchased = True, purchased_at = datetime.now()
  )
  order_2 = Cart(
    user_id=1, item_id=8, count=5, purchased = True, purchased_at = datetime.now()
  )
  order_3 = Cart(
    user_id=1, item_id=6, count=1, purchased = True, purchased_at = datetime.now()
  )

  db.session.add(order_1)
  db.session.add(order_2)
  db.session.add(order_3)

  db.session.commit()

def undo_carts():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM carts"))

  db.session.commit()
