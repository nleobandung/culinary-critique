import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { getProfileInfo, rateProfile } from '../api.js';
import "./ProfilePage.css";
import CommentsSection from '../Components/CommentsSection';
import { UserDataContext } from "../context/UserDataProvider";

const ProfilePage = () => {
  const [rating, setRating] = useState(0);
  const [numRatings, setNumRatings] = useState(0);
  const [avgRatings, setAvgRatings] = useState(0);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false); // State to toggle comments visibility
  const { userData } = useContext(UserDataContext);
  const { name: profileName } = useParams();

  useEffect(() => {
    const fetchProfileInfo = async () => {
      if (profileName) {
        try {
          const { averageRating, numberOfRatings, comments } = await getProfileInfo(profileName);
          setNumRatings(numberOfRatings);
          setAvgRatings(averageRating);
          setComments(comments || []);
        } catch (error) {
          console.error('Error fetching profile info:', error);
        }
      }
    };

    fetchProfileInfo();
  }, [profileName]);

  useEffect(() => {
    setStars(avgRatings);
  }, [avgRatings]);

  const handleRatingChange = (value) => {
    setRating(value);
    sendRatingToBackend(value);
  };

  const sendRatingToBackend = async (stars) => {
    try {
      const response = await rateProfile({ name: profileName, stars, username: userData.username });
      setNumRatings(response.numberOfRatings);
      setAvgRatings(response.averageRating);
    } catch (error) {
      console.error("Error sending rating to backend:", error);
    }
  };

  const addComment = (text) => {
    const newComment = {
      username: userData.username, // Assuming userData contains the username
      text: text,
      date: new Date().toLocaleDateString() // Adding date for completeness
    };
    setComments([...comments, newComment]);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  function setStars(rating) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
      if (index < rating) {
        star.style.color = 'gold';
      } else {
        star.style.color = 'gray';
      }
    });
  }

  return (
    <div className="profile-page-wrapper">
      <header className="ProfilePage-header">
        <h1>{profileName}</h1>
        <div className="rating">
          <span className="star">★</span>
          <span className="star">★</span>
          <span className="star">★</span>
          <span className="star">★</span>
          <span className="star">★</span>
        </div>
        <p className="average-rating">Average rating: {avgRatings}</p>
        <p className="number-ratings">{numRatings} ratings</p>
        <br />
        <p>Leave a rating!</p>
        {userData.isLoggedIn ? (
          <div className="rating">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                className={value <= rating ? "active" : ""}
                onClick={() => handleRatingChange(value)}
              >
                ★
              </button>
            ))}
          </div>
        ) : (
          <div className="login-wrapper">
            <Link to="/login" className="login">Log in to leave a rating</Link>
          </div>
        )}
      </header>
      <div className="comments-dropdown">
        <button className="toggle-button" onClick={toggleComments}>
          {showComments ? "Hide Comments" : "Show Comments"}
        </button>
        {showComments && (
          <CommentsSection comments={comments} addComment={addComment} />
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
