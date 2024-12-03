import React, { useState, useEffect } from "react";
import Toolbar from "./Toolbar";
import CreatorInfo from "./CreatorInfo";
import StarRating from "./StarRating";
import "bootstrap/dist/css/bootstrap.min.css";
import RecipeInfo from "./RecipeInfo";
import Comments from "./Comments";

function DisplayRecipe() {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/recipe-info", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch recipe info");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        console.log("Data: ", data);
      })
      .catch((err) => {
        console.error("Error Fetching Recipe Info: ", err);
        setError(err.message);
      });
  }, []);

  return (
    <div>
      <Toolbar />
      <CreatorInfo />
      <StarRating />
      <RecipeInfo info={data} />
      <Comments recipeId={data.id} />
    </div>
  );
}

export default DisplayRecipe;
