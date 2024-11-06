import React from "react";
import RecipeCard from "./RecipeCard";

const RecipeGrid = () => {
  return (
    <div style={styles.grid}>
      <RecipeCard
        src={`${process.env.PUBLIC_URL}/burger-with-melted-cheese.png`}
      />
      <RecipeCard
        src={`${process.env.PUBLIC_URL}/fried-salmon-steak-cooked-green-600nw-2489026949.png`}
      />
      {/* Add more RecipeCards as needed */}
    </div>
  );
};

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    padding: "20px",
  },
};

export default RecipeGrid;
