import React from "react";
import Toolbar from "./Toolbar";
import CreatorInfo from "./CreatorInfo";
import StarRating from "./StarRating";
import 'bootstrap/dist/css/bootstrap.min.css';

function DisplayRecipe() {
  return (
    <div>
      <Toolbar />
      <CreatorInfo />
      <StarRating />
    </div>
  );
}

export default DisplayRecipe;
