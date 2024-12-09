import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/RecipeInfo.css";

function RecipeInfo({ info }) {
  const { ingredients = [], steps = [], cookware = [], recipeId } = info;

  const [checkedSteps, setCheckedSteps] = useState(new Array(steps.length).fill(false));

  useEffect(() => {
    if (steps.length !== checkedSteps.length) {
      setCheckedSteps(new Array(steps.length).fill(false));
    }
  }, [steps]);

  const checkStep = (index) => {
    const updatedCheckedSteps = [...checkedSteps];
    updatedCheckedSteps[index] = !updatedCheckedSteps[index];
    setCheckedSteps(updatedCheckedSteps);
  };

  const onSaveRecipe = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipeId }),
      }
    
      const result = await fetch("/api/save", options);
    /*
      if (!result.ok) {
        throw new Error("Failed to save Recipe");
      }

      const data = await result.json();
    */
    }
    catch (err) {
      console.error(err);
    }
  }

  return (
    <fieldset>
      <legend>Recipe Information</legend>
      <div className="container-fluid text-center w-100">
        <div className="row">
          <div className="col">
            <h5>Ingredients</h5>
            <div className="table-container">
              <table className="recipe-table">
                <tbody>
                  {ingredients.length > 0 ? (
                    ingredients.map((ingredient, index) => (
                      <tr key={index}>
                        <td>{ingredient.quantity} {ingredient.name}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>No ingredients listed</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col">
            <h5>Cookware</h5>
            <div className="table-container">
              <table className="recipe-table">
                <tbody>
                  {cookware.length > 0 ? (
                    cookware.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>No cookware listed</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h5>Instructions</h5>
            <div className="table-container">
              <table className="recipe-table">
                <thead>
                  <tr>
                    <th>Step Number</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {steps.length > 0 ? (
                    steps.map((step, index) => (
                      <tr key={index} onClick={() => {checkStep(index)}} style={{backgroundColor: !checkedSteps[index] ? "transparent" : "green"}}>
                        <td>{index + 1}</td>
                        <td>{step.description}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2">No instructions listed</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
              <button className="btn btn-primary mt-3 mb-0" onClick={onSaveRecipe}>Save Recipe</button>
            </div>
        </div>
      </div>
    </fieldset>
  );
}

export default RecipeInfo;
