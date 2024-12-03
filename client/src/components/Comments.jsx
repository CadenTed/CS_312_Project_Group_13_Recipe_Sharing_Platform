import React from "react";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Comments({recipeId}) {

  const [comment, setComment] = useState('');
  const [commentData, setCommentData] = useState(null);

  const getComments = async () => {
      console.log(`Recipe Id: ${recipeId}\n`);
      const response = await fetch("http://localhost:5001/api/getComments", {
         method: 'POST',
         headers: {
            "Content-Type": "application/json"
            },
         body: JSON.stringify({recipeId})
      });
      const result = await response.json();
      console.log(result);
      if (result.success)
         {
         setCommentData(result.commentContent);
         }
      else
         {
          console.log("No comments found");
         }
               
     }

  const addComment = async (event) => {
      event.preventDefault();

      let commentData = {
         commentContent: comment,
         recipeId: recipeId };
      console.log(commentData);
      const response = await fetch("http://localhost:5001/api/addComment", {
         method: 'POST',
         headers: {
            "Content-Type": "application/json"
            },
         body: JSON.stringify(commentData)
         });
      setComment('');
  }

  useEffect(() => {
   if (recipeId)
      {
       getComments();
      }
   }, [recipeId]);
  

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
