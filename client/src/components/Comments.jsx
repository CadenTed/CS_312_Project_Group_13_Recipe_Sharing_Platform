import React from "react";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Comments(recipeId) {

  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const {commentData, setCommentData} = useState(null);

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
       setCommentData( await response.json());

         if (commentData.success) {
           
         } else {
            setError(commentData.error);
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
      const result = await response.json();

      if (result.success) {
         
      } else {
         setError(result.error);
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
   <div className="commentContainer">
      <div style={{ marginTop: "3em" }}>
         <form onSubmit={addComment}>
            <div className="d-flex align-items-end justify-content-center">
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
      <div className="d-flex align-items-end justify-content-center" style={{marginTop: "3vh"}}>
         {commentData != null ? (
            commentData.map((comment, index) => (
               <div key={index}>
                  <div className="commentHeader">
                     <div>
                        <div className="commentDate">
                           <h3>{comment.date}</h3>
                        </div>
                        <div className="commentAuthor">
                           <h3>{comment.author}</h3>
                        </div>
                     <div/>
                  </div>
                  <div className="commentContent">
                     <p>{comment.content}</p>
                  </div>
               </div>
      </div> ))
         ) : (
            <div>
               <h3>No Comments Yet</h3>
            </div>
         )}
      </div>
   </div>
            
  );
}

export default Comments;
