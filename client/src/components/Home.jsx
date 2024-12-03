import React, {useState} from "react";
import Toolbar from "./Toolbar";
import RecipeGrid from "./RecipeGrid";
import "../styles/App.css";

function Home() {
  const [searchText, setSearchText] = useState("");
  return (
    <div className="App">
      <Toolbar searchText={searchText} setSearchText={setSearchText} />
      <RecipeGrid searchText={searchText} />
    </div>
  );
}

export default Home;
