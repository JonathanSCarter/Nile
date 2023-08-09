import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkUpdateReview, thunkDeleteReview } from "../../store/review";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function EditReview({ review, id }) {
  const dispatch = useDispatch();
  const [hoverRating, setHoverRating] = useState(null);
  const [rating, setRating] = useState(review.rating);
  const [message, setMessage] = useState(review.message);

  const handleRatingChange = (e) => {
    const newRating = parseInt(e.target.value);
    setRating(newRating);
  };

  const handleMessageChange = (e) => {
    const newMessage = e.target.value;
    setMessage(newMessage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { rating, message };
    dispatch(thunkUpdateReview(review.id, payload, id));
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(thunkDeleteReview(review.id, id));
  };

  return (
    <div className="review-box">
      <h2>Edit Review</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="rating-in-review-box">
            <FontAwesomeIcon
              icon={faStar}
              style={{
                color: "#ffdd00",
              }}
              onClick={() => setRating(1)}
              onMouseEnter={() => setHoverRating(1)}
              onMouseLeave={() => setHoverRating(null)}
            />
            <FontAwesomeIcon
              icon={faStar}
              style={{
                color:
                  hoverRating === null
                    ? rating >= 2
                      ? "#ffdd00"
                      : "#ccc"
                    : hoverRating >= 2
                    ? "#ffdd00"
                    : "#ccc",
                cursor: "pointer",
              }}
              onClick={() => setRating(2)}
              onMouseEnter={() => setHoverRating(2)}
              onMouseLeave={() => setHoverRating(null)}
            />
            <FontAwesomeIcon
              icon={faStar}
              style={{
                color:
                  hoverRating === null
                    ? rating >= 3
                      ? "#ffdd00"
                      : "#ccc"
                    : hoverRating >= 3
                    ? "#ffdd00"
                    : "#ccc",
                cursor: "pointer",
              }}
              onClick={() => setRating(3)}
              onMouseEnter={() => setHoverRating(3)}
              onMouseLeave={() => setHoverRating(null)}
            />
            <FontAwesomeIcon
              icon={faStar}
              style={{
                color:
                  hoverRating === null
                    ? rating >= 4
                      ? "#ffdd00"
                      : "#ccc"
                    : hoverRating >= 4
                    ? "#ffdd00"
                    : "#ccc",
                cursor: "pointer",
              }}
              onClick={() => setRating(4)}
              onMouseEnter={() => setHoverRating(4)}
              onMouseLeave={() => setHoverRating(null)}
            />
            <FontAwesomeIcon
              icon={faStar}
              style={{
                color:
                  hoverRating === null
                    ? rating >= 5
                      ? "#ffdd00"
                      : "#ccc"
                    : hoverRating >= 5
                    ? "#ffdd00"
                    : "#ccc",
                cursor: "pointer",
              }}
              onClick={() => setRating(5)}
              onMouseEnter={() => setHoverRating(5)}
              onMouseLeave={() => setHoverRating(null)}
            />
          </div>
        </div>
        <div className="review-message-area">
          <label>Message (optional):</label>
          <textarea
            value={message}
            onChange={handleMessageChange}
            maxLength={500}
            rows={6}
          />
        </div>
        <div className="button-holder">
          <button type="submit">Update</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </form>
    </div>
  );
}

export default EditReview;
