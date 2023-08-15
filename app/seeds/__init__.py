from flask.cli import AppGroup
from .users import seed_users, undo_users
from .items import seed_items, undo_items
from .purchases import seed_purchases, undo_purchases
from .reviews import seed_reviews, undo_reviews
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
  if environment == 'production':
    undo_reviews()
    undo_purchases()
    undo_items()
    undo_users()
  seed_users()
  seed_items()
  seed_purchases()
  seed_reviews()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
  undo_reviews()
  undo_purchases()
  undo_items()
  undo_users()
