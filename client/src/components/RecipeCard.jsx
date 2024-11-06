import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function RecipeCard({ src }) {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        src={src}
        height="150px"
        width="150px"
        className="card-img-top"
        alt="..."
        style={{ objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">Recipe Name</h5>
        <p className="card-text">DESCRIPTION HERE</p>
      </div>
    </div>
  );
}

export default RecipeCard;
