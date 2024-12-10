import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Comments({ info, refreshRecipeInfo }) {
   const { comments = [], recipeId } = info;
   const [comment, setComment] = useState("");
 
   const addComment = async (event) => {
     event.preventDefault();
 
     let commentData = {
       commentContent: comment,
       recipeId: recipeId,
     };
 
     console.log(commentData);
 
     await fetch("http://localhost:5001/api/addComment", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(commentData),
     });
 
     setComment("");

     refreshRecipeInfo();
   };

   const deleteComment = async (comment) => {
      const response = await fetch("http://localhost:5001/api/deleteComment", {
         method:'POST',
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({commentId: comment.ratingId}),
      });

      const result = await response.json();

      if (result.success) {
       refreshRecipeInfo();
      }
   }
 
   return (
     <div className="commentContainer">
       <div style={{ marginTop: "3em" }}>
         <form onSubmit={addComment}>
           <div className="d-flex align-items-end justify-content-center">
             <div style={{ flexBasis: "66.6666%", marginRight: "10px" }}>
               <div className="d-flex flex-column">
                 <label
                   htmlFor="comment"
                   className="form-label text-start ms-5"
                 >
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
       <div
         className="d-flex align-items-end justify-content-center"
         style={{ marginTop: "3vh" }}
       >
         {comments ? (
           comments.map((comment, index) => (
             <div
               key={index}
               style={{
                 padding: "1vw",
                 backgroundColor: "grey",
                 margin: "20px",
                 display: "flex",
                 flexDirection: "row",
                 justifyContent: "space-between",
                 width: "10vw",
               }}
             >
               <div
                 className="commentHeader"
                 style={{
                   display: "flex",
                   flexDirection: "column",
                   justifyContent: "space-between",
                   width: "100%",
                 }}
               >
                 <div
                   style={{
                     display: "flex",
                     flexDirection: "row",
                     justifyContent: "space-between",
                   }}
                 >
                   <div className="commentDate">
                     <h6>
                       {" "}
                       {new Date(comment.ratingDate).toLocaleDateString("en", {
                         year: "numeric",
                         month: "short",
                         day: "2-digit",
                       })}
                     </h6>
                   </div>
                   <div className="commentAuthor">
                     <h3>{comment.username}</h3>
                   </div>
                 </div>
                 <div />
                 <div className="commentContent">
                   <p>{comment.comment}</p>
                 </div>
                 <div>
                   <button onClick={() => deleteComment(comment)}>Delete</button>
                 </div>
               </div>
             </div>
           ))
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