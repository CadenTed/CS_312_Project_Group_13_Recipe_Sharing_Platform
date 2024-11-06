import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const StarRating = () => {
  const [rating, setRating] = useState(0); // Initial rating is 0
  const [hover, setHover] = useState(0); // Tracks hover state

  return (
    <div style={{ display: "flex" }} className="ps-xl-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          starId={star}
          rating={rating}
          hover={hover}
          setRating={setRating}
          setHover={setHover}
        />
      ))}
    </div>
  );
};

const Star = ({ starId, rating, hover, setRating, setHover }) => {
  return (
    <span
      onMouseEnter={() => setHover(starId)}
      onMouseLeave={() => setHover(0)}
      onClick={() => setRating(starId)}
      style={{
        cursor: "pointer",
        color: starId <= (hover || rating) ? "#FFA500" : "gray",
        fontSize: "2em",
      }}
    >
      ★
    </span>
  );
};

export default StarRating;
