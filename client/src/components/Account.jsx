import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import RecipeCard from "./RecipeCard";
import "../styles/Account.css";

function Account() {
   const [activeTab, setActiveTab] = useState("posted");

   const [tab, setTab] = useState(false);
   const [userRecipes, setUserRecipes] = useState([]);
   const [savedRecipes, setSavedRecipes] = useState([]);

   const getUserRecipes = async () => {
      const response = await fetch("http://localhost:5001/api/savedRecipes", {
         method: "POST",
      });
      setUserRecipes(await response.json());
      console.log(userRecipes);
   }

   const getSavedRecipes = async () => {
      const response = await fetch("http://localhost:5001/api/savedRecipes", {
         method: "POST",
      });
      setSavedRecipes(await response.json());
      console.log("Saved", savedRecipes.recipes);
   }

   useEffect(() => {
      getSavedRecipes();
      getUserRecipes();
   }, []);

   const handleTabClick = (tab) => {
      setActiveTab(tab);
   }

   return(
      <div className="">
         <div className="">
            <div style={{padding: "2em"}}>
               <h2>Account</h2>
               <img src="/avatar-default.svg" alt="Avatar" width={150} style={{ float: "left" }} />
               <h4 style={{float: "left"}}>Username</h4>
               <p style={{float: "left", margin: "2em 2em"}}>Biography: <br/> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <div style={{clear: "both"}}></div>
            <div className="tabs">
               <button
                  className={`tab-button ${activeTab === "posted" ? "active" : ""}`}
                  onClick={() => { handleTabClick("posted");  getUserRecipes(); }}
               >
                  Posted Recipes
               </button>
               <button
                  className={`tab-button ${activeTab === "saved" ? "active" : ""}`}
                  onClick={() => { handleTabClick("saved"); getSavedRecipes(); }}
               >
                  Saved Recipes
               </button>
            </div>
            <div className="tab-content">
               {activeTab === "posted" ? (
                  <div style={styles.gridContainer}>
                     <div style={styles.grid}>
                     {userRecipes.length > 0 ? (
                        userRecipes.recipes.map((recipe) => (
                           <RecipeCard key={recipe.recipeId} recipe={recipe} />
                        ))
                     ) : (
                        <p>No Posted Recipes Available</p>
                     )}
                     </div>
                  </div>
               ) : (
                  <div style={styles.gridContainer}>
                     <div style={styles.grid}>
                     {savedRecipes.recipes.length > 0 ? (
                        savedRecipes.recipes.map((recipe) => (
                           <RecipeCard key={recipe.recipeId} recipe={recipe} />
                        ))
                     ) : (
                        <p>No Saved Recipes Available</p>
                     )}
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

const styles = {
   gridContainer: {
     display: "flex",
     justifyContent: "center",
   },
   grid: {
     display: "grid",
     gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
     gap: "16px",
   },
 };

export default Account;