import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/RecipeInfo.css";

function RecipeInfo({ info }) {
  const { ingredients = [], cookware = [], steps = [] } = info;

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
                      <tr key={index}>
                        <td style={{width: "10%"}}>{index + 1}</td>
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
