import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/RecipeInfo.css";

function RecipeInfo({ info }) {
  const { ingredients = [], cookware = [], steps = [] } = info;

  const [checkedSteps, setCheckedSteps] = useState(new Array(steps.length).fill(false));

  useEffect(() => {
    setCheckedSteps(new Array(steps.length).fill(false));
  }, [steps]);

  const checkStep = (index) => {
    const updatedCheckedSteps = [...checkedSteps];
    updatedCheckedSteps[index] = !updatedCheckedSteps[index];
    setCheckedSteps(updatedCheckedSteps);
  };

  const saveRecipe = async () => {
   fetch("http://localhost:5001/api/save",{
      method: 'POST',
      headers: {
         "Content-Type": 'application/json',
         },
      body: JSON.stringify({recipeId: info.id})
      });
  }

  return (
    <fieldset>
      <legend>Recipe Information</legend>
      <button onClick={saveRecipe}>Save Recipe</button>
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
                        <td>{ingredient}</td>
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
                        <td>{item}</td>
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
        <div className="row mt-3">
          <div className="col">
            <h5>Instructions</h5>
            <div className="table-container instructions">
              <table className="recipe-table">
                <thead>
                  <tr>
                    <th>Step Number</th>
                    <th>Instruction</th>
                  </tr>
                </thead>
                <tbody>
                  {steps.length > 0 ? (
                    steps.map((step, index) => (
                      <tr
                        key={index}
                        onClick={() => checkStep(index)}
                        style={{
                          backgroundColor: checkedSteps[index] ? "green" : "transparent",
                        }}
                      >
                        <td style={{ width: "10%" }}>{index + 1}</td>
                        <td>{step}</td>
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
      </div>
    </fieldset>
  );
}

export default RecipeInfo;
