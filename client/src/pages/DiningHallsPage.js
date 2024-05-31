import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from '../Components/NavBar';  // Ensure correct path and case sensitivity
import Background from "../Components/background";  // Ensure correct path and case sensitivity
import { getTop5 } from '../api.js';

function DiningHallsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [topProfiles, setTopProfiles] = useState([]);
  const [worstProfiles, setWorstProfiles] = useState([]);
  const [mostPopularProfiles, setMostPopularProfiles] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getTop5();
      setTopProfiles(data.top5Profiles);
      setWorstProfiles(data.worst5Profiles);
      setMostPopularProfiles(data.mostPopularProfiles);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const renderDiningHall = (diningHall) => (
    <div key={diningHall.name}>
      <p>
        <Link
          to={`/profile/${encodeURIComponent(diningHall.name)}`}
          style={{ textDecoration: "underline" }}
        >
          Name: {diningHall.name}
        </Link>
      </p>
      <p>Rating: {diningHall.averageRating}</p>
      <p>Number of Reviews: {diningHall.numberOfRatings}</p>
    </div>
  );

  return (
    <div>
      <Background />
      <Navbar />
      <h1>Dining Halls</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <h2>Recent Menu Options!</h2>
      <h2>Top 5 Rated Dining Halls</h2>
      {topProfiles.map(renderDiningHall)}
      <h2>Worst 5 Rated Dining Halls</h2>
      {worstProfiles.map(renderDiningHall)}
      <h2>Top 5 Most Reviewed Dining Halls</h2>
      {mostPopularProfiles.map(renderDiningHall)}
    </div>
  );
}

export default DiningHallsPage;
