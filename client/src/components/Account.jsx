import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import RecipeCard from "./RecipeCard";

function Account() {

   const [tab, setTab] = useState(false);
   const [userRecipes, setUserRecipes] = useState(null);
   const [savedRecipes, setSavedRecipes] = useState(null);

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
      console.log(savedRecipes);
   }

   useEffect(() => {
      getSavedRecipes();
      getUserRecipes();
   }, []);

   return(
      <div className="">
         <div className="">
            <div>
               <h2>Account</h2>
            </div>
            <div>
               {tab ? (
                  <div style={styles.gridContainer}>
                     <div style={styles.grid}>
                     {userRecipes.length > 0 ? (
                        userRecipes.map((recipe) => (
                           <RecipeCard key={recipe.recipeId} recipe={recipe} />
                        ))
                     ) : (
                        <p>No Recipes Available</p>
                     )}
                     </div>
                  </div>
               ) : (
                  <div>

                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

const styles = {
   gridContainer: {
     diplay: "flex",
     justifyContent: "center",
   },
   grid: {
     display: "grid",
     gridTemplateColumns: "repeat(5, 1fr)",
     gap: "20px",
     padding: "20px",
     justifyContent: "center",
     width: "100%",
     maxWidth: "1200px", // Adjust as needed
     margin: "0 auto",
   },
 };

export default Account;