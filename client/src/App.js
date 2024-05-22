import React, { useState } from "react";
import "./App.css";
import bplate1 from "./bplate1.jpg";
import DiningHallsPage from "./DiningHallsPage";
import Socialprofile from "../src/SocialMedia/socialprofile";
import UserProfile from "../src/SocialMedia/socialprofile";

function App() {
  const [rating, setRating] = useState(0);
  const [numRatings, setNumRatings] = useState(0);
  const [currentPage, setCurrentPage] = useState("profile");

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const switchToDiningHallsPage = () => {
    setCurrentPage("diningHalls");
  };

  const switchToProfilePage = () => {
    setCurrentPage("profile");
  };

  return (
    <UserProfile/>
    // <div className="App">
    //   {currentPage === "profile" && (
    //     <header className="App-header">
    //       <h1>Bruin Plate</h1>
    //       <div className="rating">
    //         {[1, 2, 3, 4, 5].map((value) => (
    //           <button
    //             key={value}
    //             className={value <= rating ? "active" : ""}
    //             onClick={() => handleRatingChange(value)}
    //           >
    //             ★
    //           </button>
    //         ))}
    //       </div>
    //       <p className="number-ratings">{numRatings} ratings</p>
    //       <div className="image-grid">
    //         {/* Must find way to load multiple images from backend */}
    //         <div className="image-item">
    //           <img src={bplate1} alt="Dog 1" />
    //           <p>Bruin Plate</p>
    //         </div>
    //         {/* Add more image items */}
    //       </div>
    //       <button onClick={switchToDiningHallsPage}>View Dining Halls</button>
    //     </header>
    //   )}
    //   {currentPage === "diningHalls" && (
    //     <DiningHallsPage switchToProfilePage={switchToProfilePage} />
    //   )}
    // </div>
  );
}

export default App;