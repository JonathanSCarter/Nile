import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetReviews } from "../../store/review";
import Review from "../Review";
import CreateReview from "../CreateReview";
import EditReview from "../EditReview";

function ReviewContainer({ id }) {
  const [isReview, setIsReview] = useState(false);
  const [userReview, setUserReview] = useState(null);
  const user = useSelector((state) => state.session.user);
  const [isOwner, setIsOwner] = useState(null)
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.allReviews);
  const normalizedReviews = [...Object.values(reviews)];
  const ownerId = useSelector(state => state.items.singleItem.seller_id)

  useEffect(() => {
    if (user) {
      setUserId(user.id);
      if(ownerId != user.id) {
        console.log('test');
        setIsOwner(false);
      } else setIsOwner(true);
    } else setUserId(null);
    console.log(userId, ownerId, isOwner);
  }, [user]);

  useEffect(() => {
    dispatch(thunkGetReviews(id));
  }, []);

  useEffect(() => {
    const userReview = normalizedReviews.find(
      (review) => review.user_id === userId
    );
    if (userReview) {
      setIsReview(true);
      setUserReview(userReview);
    } else {
      setIsReview(false);
    }
  }, [normalizedReviews, userId]);

  console.log(user, isOwner, isReview, (user && !isOwner))

  return (
    <div className="review-container">
      <div className="review-container-new-div">
        <h2>Reviews</h2>
        {normalizedReviews.length ? (
          normalizedReviews.map((review) => {
            return <Review review={review} />;
          })
        ) : (
          <h4>There are no reviews for this item.</h4>
        )}
        {(user && !isOwner) ? (
          isReview ? (
            <EditReview review={userReview} id={id} />
          ) : (
            <CreateReview id={id} />
          )
        ) : null}
      </div>
        <div></div>
    </div>
  );

}

export default ReviewContainer;
