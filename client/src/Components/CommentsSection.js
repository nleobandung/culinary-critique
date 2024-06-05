import React, { useState } from "react";
import "./CommentsSection.css";

const CommentsSection = ({ comments, addComment }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      addComment(comment);
      setComment("");
    }
  };

  return (
    <div className="comments-section">
      <h2>Comments</h2>
      <ul className="comment-list">
        {comments && comments.map((comment, index) => (
          <li key={index} className="comment">
            <div className="comment-header">
              <span className="comment-author">{comment.username}</span>
              <span className="comment-date">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="comment-body">
              {comment.text}
            </div>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
        ></textarea>
        <button type="submit">Post Comment</button>
      </form>
      <div className="login-wrapper">
        <a href="/login">Log in</a> to post a comment
      </div>
    </div>
  );
};

export default CommentsSection;
