import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Avatar.css";

function Avatar() {
  return (
    <div className="avatar d-flex flex-column">
      <img
        src={`${process.env.PUBLIC_URL}/avatar-default.svg`}
        alt="Profile"
        className="avatar-image"
      />
      <button className="profile-button">Profile</button>
    </div>
  );
}

export default Avatar;
