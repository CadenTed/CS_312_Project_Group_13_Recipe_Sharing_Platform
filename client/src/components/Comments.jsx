import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Comments() {
  return (
    <div style={{ marginTop: "3em" }}>
      <form>
        <div className="d-flex align-items-end">
          <div style={{ flexBasis: "66.6666%", marginRight: "10px" }}>
            <div className="d-flex flex-column">
              <label htmlFor="comment" className="form-label text-start ms-5">
                Comment:
              </label>
              <textarea
                id="comment"
                name="comment"
                className="form-control ms-5"
                rows="5"
                required
              ></textarea>
            </div>
          </div>
          <button type="submit" className="btn btn-outline-primary ms-5">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Comments;
