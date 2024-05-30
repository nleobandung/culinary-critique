import React, { useState, useEffect } from "react";
import "./App.css";
import bplate1 from "./bplate1.jpg";
import DiningHallsPage from "./Components/HomePage/DiningHallsPage";
import LoginPage from "./Components/LoginPage";
import { getProfileRatingCount, rateProfile, createProfile } from './api.js';

function App() {
  const [rating, setRating] = useState(0);
  const [numRatings, setNumRatings] = useState(0);
  const [currentPage, setCurrentPage] = useState("profile");
  const [username, setUsername] = useState("");
  const [profileName, setprofileName] = useState("Bruin Plate");

  useEffect(() => {
    const fetchRatingCount = async () => {
      try {
        const count = await getProfileRatingCount(profileName);
        setNumRatings(count);
      } catch (error) {
        console.error('Error fetching rating count:', error);
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
      const response = await rateProfile({ name: profileName, stars, username });
      setNumRatings(response.numberOfRatings);
    } catch (error) {
      console.error("Error sending rating to backend:", error);
    }
  };

  const switchToDiningHallsPage = () => {
    setCurrentPage("diningHalls");
  };

  const switchToProfilePage = () => {
    setCurrentPage("profile");
  };

  const switchToLoginPage = () => {
    setCurrentPage("login");
  };

  const handleLogin = (username) => {
    console.log("Logged in as:", username);
    setUsername(username);
    switchToProfilePage();
  };

  return (
    <div className="App">
      {currentPage === "profile" && (
        <header className="App-header">
          <h1>Bruin Plate</h1>
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
          <p className="number-ratings">{numRatings} ratings</p>
          <div className="image-grid">
            {/* Must find way to load multiple images from backend */}
            <div className="image-item">
              <img src={bplate1} alt="Dog 1" />
              <p>Bruin Plate</p>
            </div>
            {/* Add more image items */}
          </div>
          <button onClick={switchToDiningHallsPage}>View Dining Halls</button>
          <button onClick={switchToLoginPage}>Login</button>
        </header>
      )}
      {currentPage === "diningHalls" && (
        <DiningHallsPage switchToProfilePage={switchToProfilePage} />
      )}
      {currentPage === "login" && (
        <LoginPage switchToProfilePage={switchToProfilePage} onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;