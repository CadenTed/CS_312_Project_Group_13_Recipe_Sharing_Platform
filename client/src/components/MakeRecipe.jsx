import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/MakeRecipe.css";

function MakeRecipe() {
  return (
    <div>
      <h1>Add Recipe!</h1>

      <form className="container">
        <label htmlFor="name" className="title-label">
          Recipe Title
        </label>
        <input
          type="text"
          placeholder="Recipe Name"
          name="name"
          className="title-input form-control"
        />

        <button className="image-button btn btn-secondary">Upload Image</button>

        <label htmlFor="ingredients" className="ing-label">
          Add your ingredients
        </label>

        <label htmlFor="cookware" className="cook-label">
          Add your cookware
        </label>

        <input
          type="text"
          placeholder="Ingredients"
          name="ingredients"
          className="ing-input form-control"
        />
        <button className="ing-button btn btn-outline-primary">
          Add Ingredient
        </button>

        <input
          type="text"
          placeholder="Cookware"
          name="cookware"
          className="cook-input form-control"
        />
        <button className="cook-button btn btn-outline-primary">
          Add Cookware
        </button>

        <label htmlFor="instructions" className="instruct-label">
          Instructions
        </label>

        <input
          type="text"
          placeholder="Instructions"
          name="instructions"
          className="instruct-input form-control"
        />
        <button className="instruct-button btn btn-outline-primary">
          Add Step
        </button>

        <button className="submit-button btn btn-success">Submit</button>
      </form>
    </div>
  );
}

export default MakeRecipe;
