import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetReviews } from "../../store/review";
import Review from "../../Review";
import CreateReview from "../CreateReview";
import EditReview from "../EditReview";

function ReviewContainer({ id }) {
  const [isReview, setIsReview] = useState(false);
  const [userReview, setUserReview] = useState(null);
  const user = useSelector((state) => state.session.user);
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.allReviews);
  const normalizedReviews = [...Object.values(reviews)];
  useEffect(() => {
    if (user) setUserId(user.id);
    else setUserId(null);
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

  return (
    <div className="review-container">
      <h2>Reviews</h2>
      {normalizedReviews.length
        ? normalizedReviews.map((review) => {
            return <Review review={review} />;
          })
        : null}
      {user ? (
        isReview ? (
          <EditReview review={userReview} id={id} />
        ) : (
          <CreateReview id={id} />
        )
      ) : null}
    </div>
  );
}

export default ReviewContainer;
