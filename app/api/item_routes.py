from flask import Blueprint, request
from app.models import Item, db
from flask_login import current_user
from app.forms.item_form import ItemForm

item_routes = Blueprint('items', __name__)

@item_routes.route('/')
def get_items():
  """
  Queries for all items and returns them in a list of item dictionaries
  """
  items = Item.query.all()
  return [item.to_dict for item in items]

@item_routes.route('/<int:id>')
def get_item(id):
  """
  Queries for an item and returns it as a dictionary
  """
  item = Item.query.get(id)
  return item.to_dict

@item_routes.route('/', methods=['POST'])
def post_items():
  """
  Takes in a request, creates an item, and then returns the item as a dictionary
  """
  if not current_user.is_authenticated:
    return {'errors': ['Unauthorized']}

  form = ItemForm()
  form["csrf_token"].data = request.cookies.get("csrf_token")

  if form.validate_on_submit():
    item = Item()
    form.populate_obj(item)
    item.seller = current_user.first_name
    db.session.add(item)
    db.session.commit()
    return item.to_dict
  return {"errors": form.errors}, 400

@item_routes.route('/<int:id>/delete')
def delete_item(id):
  """
  Takes in an id from the url and deletes the item
  """
  if not current_user.is_authenticated:
    return {'errors': ['Unauthorized']}
  item = Item.query.get(id)
  print(item.seller)
  print(current_user.first_name)
  if not item.seller == current_user.first_name:
    return {'errors': ['Unauthorized']}
  db.session.delete(item)
  return {"message": "Successfully deleted"}
