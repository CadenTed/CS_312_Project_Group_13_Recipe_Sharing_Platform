import React, { useState, useEffect } from "react";
import Toolbar from "./Toolbar";
import CreatorInfo from "./CreatorInfo";
import StarRating from "./StarRating";
import "bootstrap/dist/css/bootstrap.min.css";
import RecipeInfo from "./RecipeInfo";
import Comments from "./Comments";

function DisplayRecipe() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch("/api/recipe-info", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch recipe info");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.error("Error Fetching Recipe Info: ", err);
      });
  }, []);

  return (
    <div>
      <Toolbar />
      <CreatorInfo />
      <StarRating />
      <RecipeInfo info={data} />
      <Comments comments={data.comments} />
    </div>
  );
}

export default DisplayRecipe;
