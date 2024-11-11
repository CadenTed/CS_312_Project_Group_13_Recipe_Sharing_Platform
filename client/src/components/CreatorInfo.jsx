import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function CreatorInfo() {
  return (
    <div className="d-flex flex-row p-xl-4 pb-xl-1">
      <h3 className="ms-1 me-2">NAME</h3>
      <h3 className="ms-1 me-1">AUTHOR</h3>
      <h3 className="ms-2 me-1">DATE</h3>
    </div>
  );
}

export default CreatorInfo;
