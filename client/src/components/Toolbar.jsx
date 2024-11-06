import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Toolbar = () => {
  return (
    <div style={styles.toolbar}>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        className="form-control"
        style={styles.search}
      />

      {/* Filter Button */}
      <button className="btn btn-secondary ms-2">Filter</button>

      {/* Create Recipe Button */}
      <Link to="/add-recipe" className="btn btn-primary ms-2">
        Create Recipe
      </Link>

      {/* Avatar */}
      <div style={styles.avatar} className="ms-2">
        A
      </div>
    </div>
  );
};

const styles = {
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
    backgroundColor: "#f2f2f2", // Example background color
  },
  search: {
    flex: 1,
    padding: "8px",
    marginRight: "10px",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#333",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
};

export default Toolbar;