import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProfileInfo, rateProfile } from '../api.js';
import "./ProfilePage.css";
import bplate1 from "../bplate1.jpg";
import { UserDataContext } from "../context/UserDataProvider"

const ProfilePage = () => {
  const [rating, setRating] = useState(0);
  const [numRatings, setNumRatings] = useState(0);
  const [avgRatings, setAvgRatings] = useState(0);
  const { userData } = useContext(UserDataContext);
  const profileName = useParams().name;

  useEffect(() => {
    const fetchRatingCount = async () => {
      if (profileName) {
        try {
          const { averageRating, numberOfRatings } = await getProfileInfo(profileName);
          setNumRatings(numberOfRatings);
          setAvgRatings(averageRating);
        } catch (error) {
          console.error('Error fetching rating count:', error);
        }
      }
    };

    fetchRatingCount();
  }, [profileName]);

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

  return (
    <div class="profile-page-container">
`    <header className="ProfilePage-header">
      <h1>{profileName}</h1>
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
      <p className="average-rating">Average rating: {avgRatings}</p>
      <p className="number-ratings">{numRatings} ratings</p>
    </header>`
    </div>
  );
}

export default ProfilePage;