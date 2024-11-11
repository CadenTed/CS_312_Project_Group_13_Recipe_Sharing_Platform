import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function RecipeCard({ recipe }) {
  const { id, name, description, img } = recipe;

  return (
    <Link
      to="/display-recipe"
      className="card"
      style={{ width: "18rem", textDecoration: "none" }}
    >
      <input type="hidden" value={id} name="id" />
      <img
        src={img}
        height="150px"
        width="150px"
        className="card-img-top"
        alt="..."
        style={{ objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
      </div>
    </Link>
  );
}

export default RecipeCard;
