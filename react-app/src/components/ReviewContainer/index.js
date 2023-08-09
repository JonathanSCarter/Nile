import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetReviews } from "../../store/review";
import Review from "../../Review";
import CreateReview from "../CreateReview";
import EditReview from "../EditReview";

function ReviewContainer({id}){
  const [isReview, setIsReview] = useState(false)
  const [userReview, setUserReview] = useState(null)
  const userId = useSelector(state => state.session.user.id)
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.reviews.allReviews)
  const normalizedReviews = [...Object.values(reviews)]

  useEffect(() => {
    dispatch(thunkGetReviews(id));
  }, [])

  useEffect(() => {
    const userReview = normalizedReviews.find(review => review.user_id === userId);
    if (userReview) {
      setIsReview(true);
      setUserReview(userReview);
    } else {
      setIsReview(false);
    }
  }, [normalizedReviews, userId]);

  return (
    <div>
      {normalizedReviews.length ? (normalizedReviews.map((review) => {
        return <Review review={review} />
      })
      ) : (
        null
      )}
      {isReview ? <EditReview review={userReview} id={id}/> : <CreateReview id={id} />}
    </div>
  )
}

export default ReviewContainer
