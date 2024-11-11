import React from "react";
import Toolbar from "./Toolbar";
import CreatorInfo from "./CreatorInfo";
import StarRating from "./StarRating";
import "bootstrap/dist/css/bootstrap.min.css";
import RecipeInfo from "./RecipeInfo";

function DisplayRecipe() {
  return (
    <div>
      <Toolbar />
      <CreatorInfo />
      <StarRating />
      <RecipeInfo />
    </div>
  );
}

export default DisplayRecipe;
