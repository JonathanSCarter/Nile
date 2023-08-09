import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { thunkPostReview } from "../../store/review";

function CreateReview({id}){
  const dispatch = useDispatch();
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');

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
    const payload = {rating, message}
    dispatch(thunkPostReview(id, payload))
  }

  return (
    <div>

    <h2>Leave a Review</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Rating:</label>
        <select value={rating} onChange={handleRatingChange}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <label>Message (optional):</label>
        <textarea
          value={message}
          onChange={handleMessageChange}
          maxLength={500}
          rows={4}
          />
      </div>
      <button type="submit">Submit</button>
    </form>
    </div>
  )
}

export default CreateReview
