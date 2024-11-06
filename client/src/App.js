import React from "react";
import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import MakeRecipe from "./components/MakeRecipe";

function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-recipe" element={<MakeRecipe />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
