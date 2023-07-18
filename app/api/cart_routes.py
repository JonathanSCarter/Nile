from flask import Blueprint, request
from app.models import Cart, db
from flask_login import current_user
from app.forms.cart_form import CartForm
from app.forms.cart_form_count import CartCountForm
from datetime import datetime

cart_routes = Blueprint('carts', __name__)

@cart_routes.route('/')
def get_cart():
  """
  Does a query for the current user's active cart information
  """
  print('test')
  if current_user.is_authenticated:
    carts = Cart.query.filter(Cart.user_id == current_user.id).filter(Cart.purchased == False).all()
    return [cart.to_dict for cart in carts]
  return {'errors': ['Unauthorized']}

@cart_routes.route('/purchased')
def get_purchased():
  """
  Does a query for the current user's purchase history
  """
  if current_user.is_authenticated:
    carts = Cart.query.filter(Cart.user_id == current_user.id).filter(Cart.purchased == True).order_by(Cart.purchased_at).all()
    return [cart.to_dict for cart in carts]
  return {'errors': ['Unauthorized']}

@cart_routes.route('/', methods=['POST'])
def post_to_cart():
  """
  Creates an entry in the cart table
  """
  if current_user.is_authenticated:
    form = CartForm()
    form['csrf_token'].data = request.cookies.get('csrf_token')
    if form.validate_on_submit():
      cart = Cart()
      form.populate_obj(cart)
      cart.user_id = current_user.id
      db.session.add(cart)
      db.session.commit()
      return cart.to_dict
    return {"errors": form.errors}, 400
  return {'errors': ['Unauthorized']}

@cart_routes.route('/purchase')
def purchase():
  """
  Purchases items in cart
  """
  if current_user.is_authenticated:
    carts = Cart.query.filter(Cart.user_id == current_user.id).filter(Cart.purchased == False).all()
    for cart in carts:
      cart.purchased = True
      cart.purchased_at = datetime.now()
    db.session.commit()
    carts = Cart.query.filter(Cart.user_id == current_user.id).filter(Cart.purchased == False).all()
    return [cart.to_dict for cart in carts] #Probably should change that return
  return {'errors': ['Unauthorized']}

@cart_routes.route('/<int:id>/update', methods=['POST'])
def update_cart(id):
  """
  Updates the count of a cart entry
  """
  if current_user.is_authenticated:
    cart = Cart.query.get(id)
    if current_user.id == cart.user_id:
      form = CartCountForm()
      form['csrf_token'].data = request.cookies.get('csrf_token')
      if form.validate_on_submit():
        cart.count = form.data.get('count')
        db.session.commit()
        carts = Cart.query.filter(Cart.user_id == current_user.id).filter(Cart.purchased == False).all()
        return [cart.to_dict for cart in carts]
      return {"errors": form.errors}, 400
  return {'errors': ['Unauthorized']}

@cart_routes.route('/<int:id>/delete')
def delete_cart(id):
  """
  Takes in an id from the url and deletes the cart
  """
  if current_user.is_authenticated:
    cart = Cart.query.get(id)
    if cart.user_id == current_user.id:
      db.session.delete(cart)
      db.session.commit()
      carts = Cart.query.filter(Cart.user_id == current_user.id).filter(Cart.purchased == False).all()
      return [cart.to_dict for cart in carts]
  return {'errors': ['Unauthorized']}
