import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function Review({ review }) {
  return (
    <div>
      <span>
        <FontAwesomeIcon
          icon={faStar}
          style={{ color: review.rating >= 0.5 ? "#ffdd00" : "#ccc" }}
        />
        <FontAwesomeIcon
          icon={faStar}
          style={{ color: review.rating >= 1.5 ? "#ffdd00" : "#ccc" }}
        />
        <FontAwesomeIcon
          icon={faStar}
          style={{ color: review.rating >= 2.5 ? "#ffdd00" : "#ccc" }}
        />
        <FontAwesomeIcon
          icon={faStar}
          style={{ color: review.rating >= 3.5 ? "#ffdd00" : "#ccc" }}
        />
        <FontAwesomeIcon
          icon={faStar}
          style={{ color: review.rating >= 4.5 ? "#ffdd00" : "#ccc" }}
        />{" "}
      </span>
      <h4>
      {review.name}
      </h4>
      <span>{review.message}</span>
    </div>
  );
}

export default Review;
