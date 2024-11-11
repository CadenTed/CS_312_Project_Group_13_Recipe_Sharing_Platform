import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
// import './Header.css'; // Import the custom CSS file

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src={`${process.env.PUBLIC_URL}/savorly-logo.png`}
            height="50"
            alt=""
            className="me-1"
          />
          <strong>Savorly</strong>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
