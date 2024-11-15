import React from "react";
import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserProfile from "./components/UserProfile";
import Home from "./components/Home";
import Header from "./components/Header";
import MakeRecipe from "./components/MakeRecipe";
import DisplayRecipe from "./components/DisplayRecipe";

function App() {
  
  let [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLogin()
   {
    setIsLoggedIn(true);
   }
  function handleLogout()
   {
    setIsLoggedIn(false);
   }

  return (
    <Router>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={ !isLoggedIn ? <Login onLogin={handleLogin} /> : <Home />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/add-recipe" element={<MakeRecipe />} />
          <Route path="/display-recipe" element={<DisplayRecipe />} />
          <Route path="/logout"  element={() => { UserProfile.setName(""); return(<Login />);} }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
