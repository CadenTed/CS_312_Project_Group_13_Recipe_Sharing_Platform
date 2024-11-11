import React from "react";

function RecipeInfo() {
  return (
    <fieldset>
      <legend>Recipe Information</legend>
      <div className="m-3 container-fluid text-center w-100">
        <div className="row">
          <div className="col">Ingredients</div>
          <div className="col">Cookware</div>
        </div>
        <div className="row">
          <div className="col">Instructions</div>
        </div>
      </div>
    </fieldset>
  );
}

export default RecipeInfo;
