from flask import Blueprint, request
from app.models import Item, db
from flask_login import current_user
from app.forms.item_form import ItemForm
from app.forms.image_form import ImageForm
from app.forms.item_imageless_form import ItemImagelessForm
from app.api.s3_helpers import ( upload_file_to_s3, get_unique_filename)

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

@item_routes.route('/query/<string:query>')
def get_queried_items(query):
  """
  Gets all items that fulfill the query
  """
  items = Item.query.filter(Item.name.ilike(f"%{query}%")).all()
  return [item.to_dict for item in items]

@item_routes.route('/', methods=['POST'])
def post_items():
  """
  Takes in a request, creates an item, and then returns the item as a dictionary
  """
  if current_user.is_authenticated:
    form = ItemForm()
    form["csrf_token"].data = request.cookies.get("csrf_token")
    if form.validate_on_submit():
      image = form.data.get("image")
      image.filename = get_unique_filename(image.filename)
      upload = upload_file_to_s3(image)
      print(upload, 'This is my upload ~~~~~~~~~~~~~~~~~')
      if "url" in upload:
        item = Item()
        item.category = form.data.get("category")
        item.description = form.data.get("description")
        item.image = upload.get("url")
        item.price = form.data.get("price")
        item.name = form.data.get("name")
        item.seller_id = form.data.get("seller_id")
        item.seller = current_user.first_name
        db.session.add(item)
        db.session.commit()
        return item.to_dict
      return {"errors": "Image upload failed"}, 400
    return {"errors": form.errors}, 400
  return {'errors': ['Unauthorized']}

@item_routes.route('/<int:id>/update', methods=['POST'])
def put_items(id):
  """
  Takes in a request and an id from the url, and then updates the associated item with the request
  """
  if current_user.is_authenticated:
    item = Item.query.get(id)
    if current_user.id == item.seller_id:
      form = ItemImagelessForm()
      form['csrf_token'].data = request.cookies.get('csrf_token')
      if form.validate_on_submit():
        item.category = form.data.get('category')
        item.description = form.data.get('description')
        item.price = form.data.get('price')
        item.name = form.data.get('name')
        db.session.commit()
        return item.to_dict
      return {"errors": form.errors}, 400
  return {'errors': ['Unauthorized']}

@item_routes.route('/<int:id>/update/image', methods=['POST'])
def update_image(id):
  """
  Updates the image for an item
  """
  if current_user.is_authenticated:
    item = Item.query.get(id)
    if current_user.id == item.seller_id:
      form = ImageForm()
      form['csrf_token'].data = request.cookies.get('csrf_token')
      if form.validate_on_submit():
        image = form.data.get("image")
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        if "url" in upload:
          item.image = upload.get("url")
          print(item.image, 'this is the item image')
          db.session.commit()
          return item.to_dict
        return {"errors": "Image upload failed"}, 400
      return {"errors": form.errors}, 400
  return {'errors': ['Unauthorized']}

@item_routes.route('/<int:id>/delete')
def delete_item(id):
  """
  Takes in an id from the url and deletes the item
  """
  if current_user.is_authenticated:
    item = Item.query.get(id)
    if item.seller_id == current_user.id:
      db.session.delete(item)
      db.session.commit()
      items = Item.query.all()
      return [item.to_dict for item in items]
  return {'errors': ['Unauthorized']}
