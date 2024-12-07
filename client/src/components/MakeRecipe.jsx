import React, { useState } from "react";
import Popup from "reactjs-popup";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/MakeRecipe.css";

function MakeRecipe() {
  const [ingredient, setIngredient] = useState("");
  const [cookware, setCookware] = useState("");
  const [steps, setSteps] = useState("");

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [ingredientList, setIngredientList] = useState([]);
  const [cookwareList, setCookwareList] = useState([]);
  const [stepsList, setStepsList] = useState([]);

  const onIngredientAdd = (event) => {
    event.preventDefault();
    setIngredientList([...ingredientList, ingredient]);
    setIngredient('');
  }

  const onCookwareAdd = (event) => {
    event.preventDefault();
    setCookwareList([...cookwareList, cookware]);
    setCookware('');
  }
  
  const onStepAdd = (event) => {
    event.preventDefault();
    setStepsList([...stepsList, steps]);
    setSteps('');
  }

  const onSubmit = async (event) => {
    const recipeData = {
      name: name,
      description: description,
      ingredients: ingredientList,
      cookware: cookwareList,
      steps: stepsList
    }
    try {
      const result = await fetch("/api/addRecipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });
    }
    catch (err) {
      console.error(err);
    }
    alert("Recipe Submitted!");

  }

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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button className="image-button btn btn-secondary" >Upload Image</button>

        <label className="description-lbl" htmlFor="description">Recipe Description</label>

        <textarea className="form-control description-input" placeholder="Recipe description..." id="description" value={description} onChange={(e) => setDescription(e.target.value)}>

        </textarea>

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
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
        />
        <button className="ing-button btn btn-outline-primary" onClick={onIngredientAdd}>
          Add Ingredient
        </button>

        <input
          type="text"
          placeholder="Cookware"
          name="cookware"
          className="cook-input form-control"
          value={cookware}
          onChange={(e) => setCookware(e.target.value)}

        />
        <button className="cook-button btn btn-outline-primary" onClick={onCookwareAdd}>
          Add Cookware
        </button>

        <ul className="ing-list list-group">
          {ingredientList.length > 0 ? (
            ingredientList.map((ingredient, index) => (
              <li key={index} className="list-group-item">{ingredient}</li>
            ))
          ) : (
            <li className="list-group-item">No Ingredients Yet</li>
          )}
        </ul>

        <ul className="cook-list list-group">
        {cookwareList.length > 0 ? (
            cookwareList.map((cookware, index) => (
              <li key={index} className="list-group-item">{cookware}</li>
            ))
          ) : (
            <li className="list-group-item">No Cookware Yet</li>
          )}
        </ul>


        <label htmlFor="instructions" className="instruct-label">
          Instructions
        </label>

        <input
          type="text"
          placeholder="Instructions"
          name="instructions"
          className="instruct-input form-control"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
        />
        <button className="instruct-button btn btn-outline-primary" onClick={onStepAdd}>
          Add Step
        </button>

        <ul className="list-group step-list">
          {stepsList.length > 0 ? (
            stepsList.map((step, index) => (
              <li key={index} className="list-group-item">{step}</li>
            ))
          ) : (
            <li className="list-group-item">No Steps Yet</li>
          )}
        </ul>
        
        <button className="submit-button btn btn-success" onClick={onSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default MakeRecipe;
