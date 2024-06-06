import React, { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import { getComments, addComment } from '../api.js';
import "./CommentsSection.css";
import { UserDataContext } from '../context/UserDataProvider.js'

const CommentsSection = ({ profileName }) => {
  const [comment, setComment] = useState("");
  const { userData } = useContext(UserDataContext);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await getComments(profileName);
        setComments(fetchedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [profileName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim()) {
      await addComment(profileName, userData.username, comment);
      setComment("");
      const fetchedComments = await getComments(profileName);
      setComments(fetchedComments);
    }
  };

  return (
    <div className="comments-section">
      <h2>Comments</h2>
      <div className="comments-list">
        <ul>
          {comments && comments.map((comment, index) => (
            <li key={index} className="comment">
              <div className="comment-header">
                <span className="comment-author">{comment.username}</span>
                <span className="comment-date">{new Date(comment.date).toLocaleDateString()}</span>
              </div>
              <div className="comment-body">
                {comment.text}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
        ></textarea>
        {userData.isLoggedIn ? (
          <button type="submit">Post Comment</button>
        ) : (
          <div className="login-wrapper">
            <Link to="/login">Log in</Link> to post a comment 
          </div>
        )}
      </form>
    </div>
  );
};

export default CommentsSection;
