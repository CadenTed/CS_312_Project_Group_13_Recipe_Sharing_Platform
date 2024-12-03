import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function RecipeCard({ recipe }) {
  const { id, name, description, imagepath } = recipe;

  const onClick = async (e) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      };

      const result = await fetch("/api/recipe-id", options);

      if (!result.ok) {
        throw new Error("Failed to fetch recipe");
      }

      const data = await result.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Link
      to="/display-recipe"
      className="card"
      style={{ width: "18rem", textDecoration: "none" }}
      onClick={onClick}
    >
      <input type="hidden" value={id} name="id" />
      <img
        src={imagepath}
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
