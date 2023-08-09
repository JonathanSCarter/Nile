from flask import Blueprint, request
from app.models import db, Review, Item
from app.forms.review_form import ReviewForm
from flask_login import current_user
from app.api.s3_helpers import ( upload_file_to_s3, get_unique_filename)

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/<int:id>', methods=['PUT'])
def update_review(id):
  """
  Updates the review
  """
  if current_user.is_authenticated:
    review = Review.query.get(id)
    if current_user.id == review.user_id:
      form = ReviewForm()
      form['csrf_token'].data = request.cookies.get('csrf_token')
      if form.validate_on_submit():
        form.populate_obj(review)
        db.session.commit()
        reviews = Review.query.filter(Review.item_id == review.item_id).all()
        average_rating = sum(review.rating for review in reviews) / len(reviews)
        item = Item.query.get(review.item_id)
        item.rating = average_rating
        print(item.rating)
        db.session.commit()
        return review.to_dict
      return {"errors": form.errors}, 400
  return {'errors': ['Unauthorized']}

@review_routes.route('/<int:id>', methods=['DELETE'])
def delete_review(id):
  """
  Deletes the review
  """
  if current_user.is_authenticated:
    review = Review.query.get(id)
    if current_user.id == review.user_id:
      db.session.delete(review)
      db.session.commit()
      reviews = Review.query.filter(Review.item_id == review.item_id).all()
      average_rating = sum(review.rating for review in reviews) / len(reviews)
      item = Item.query.get(review.item_id)
      item.rating = average_rating
      db.session.commit()
      return {"message": "review deleted"}
  return {'errors': ['Unauthorized']}
