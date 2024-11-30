import React from "react";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Comments(recipeId) {

  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const getComments = async () => {
      let recipeData = {
         recipeId: recipeId
      };

      try
         {
         const response = await fetch("http://localhost:5001/api/getComments", {
            method: 'POST',
            headers: {
               "Content-Type": "application/json"
               },
            body: JSON.stringify(recipeData)
         })
         const data = await response.json();

         if (data.success) {
           
         } else {
            setError(data.error);
         }
      } catch (err) {
         console.error("Error during login:", err);
         setError("An error occurred. Please try again.");
     }
  }

  const addComment = async () => {
   let commentData = {
      commentContent: comment
   };

   try
      {
       const response = await fetch("http://localhost:5001/api/addComment", {
       method: 'POST',
       headers: {
         "Content-Type": "application/json"
         },
       body: JSON.stringify(commentData)
      })
      const data = await response.json();

      if (data.success) {
         
      } else {
         setError(data.error);
      }
   } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred. Please try again.");
   }
  }

  useEffect(() => {
      getComments();
  })

  return (
    <div style={{ marginTop: "3em" }}>
      <form onSubmit={addComment}>
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
                onChange={(e) => setComment(e.target.value)}
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
