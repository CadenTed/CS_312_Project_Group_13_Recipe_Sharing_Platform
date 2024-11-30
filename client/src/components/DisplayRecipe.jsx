import React, { useState, useEffect } from "react";
import Toolbar from "./Toolbar";
import CreatorInfo from "./CreatorInfo";
import StarRating from "./StarRating";
import "bootstrap/dist/css/bootstrap.min.css";
import RecipeInfo from "./RecipeInfo";
import Comments from "./Comments";

function DisplayRecipe() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch("/api/recipe-info", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((err) => console.error("Error Fetching Recipe Info: ", err));
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
