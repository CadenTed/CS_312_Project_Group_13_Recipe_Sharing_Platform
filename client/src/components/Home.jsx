import React from "react";
import Toolbar from "./Toolbar";
import RecipeGrid from "./RecipeGrid";
import "../styles/App.css";

function Home() {
  return (
    <div className="App">
      <Toolbar />
      <RecipeGrid />
    </div>
  );
}

export default Home;
