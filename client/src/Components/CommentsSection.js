import React, { useState, useEffect, useContext } from 'react';
import { getComments, addComment } from '../api.js';
import { Link } from "react-router-dom";
import { UserDataContext } from "../context/UserDataProvider"

const CommentsSection = ({ profileName }) =>  {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const { userData } = useContext(UserDataContext);

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const profileComments = await getComments(profileName);
            setComments(profileComments);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
      };
    
    const handleAddComment = async () => {
        try {
            await addComment({ profileName: profileName, username: userData.username, text: newComment });
            fetchComments();
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

return (
    <div className="comments-section">
        <h2>Comments</h2>
        <ul>
        {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
        ))}
        </ul>
        {userData.isLoggedIn ? (
        <div>
            <textarea
                rows="4"
                cols="50"
                value={newComment}
                onChange={handleCommentChange}
                placeholder="Add a comment..."
            />
            <button onClick={handleAddComment}>Add Comment</button>
        </div>
        ) : (
            <div className="login-wrapper">
            <Link to="/login" className="login">Login to add a comment</Link>
            </div>
        )}
    </div>
    );
};

export default CommentsSection;