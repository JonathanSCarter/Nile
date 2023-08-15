from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
  reviews = [Review(rating=3, user_id=3, message="Not bad, but could be better", item_id=1),
  Review(rating=2, user_id=4, message="Hard to put together but looks good", item_id=2),
  Review(rating=4, user_id=5, message="Really soft, but smelled a bit weird", item_id=3),
  Review(rating=5, user_id=6, message="Very soft pillow! I love it!", item_id=3),
  Review(rating=4, user_id=6, message="Really good!", item_id=4),
  Review(rating=1, user_id=3, message="It told me I'm fat", item_id=5),
  Review(rating=5, user_id=5, message="Works really well", item_id=5),
  Review(rating=5, user_id=4, message="Amazing!!!", item_id=6),
  Review(rating=3, user_id=3, message="They were all the same size, but they dry my hands.", item_id=7),
  Review(rating=2, user_id=6, message="I'm bad at reading analog clocks", item_id=8),
  Review(rating=5, user_id=3, item_id=9),
  Review(rating=4, user_id=4, message="Really liked them", item_id=10),
  Review(rating=5, user_id=6, item_id=11),
  Review(rating=2, user_id=3, message="It fell on my foot and broke my toe.", item_id=12),
  Review(rating=3, user_id=4, message="Works really well, but the wire isn't long enough", item_id=13),
  Review(rating=4, user_id=5, message="Matches the decor", item_id=14),
  Review(rating=2, user_id=3, message="Very slippery", item_id=15)]

  for review in reviews:
    db.session.add(review)

  db.session.commit()

def undo_reviews():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM reviews"))
  db.session.commit()
