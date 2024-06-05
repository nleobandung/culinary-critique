import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from '../Components/NavBar';
import SearchResults from '../Components/SearchResults';
import { getTop5, getProfileNames } from '../api.js';
import './DiningHallsPage.css'; // Import the CSS file

function DiningHallsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [topProfiles, setTopProfiles] = useState([]);
  const [worstProfiles, setWorstProfiles] = useState([]);
  const [mostPopularProfiles, setMostPopularProfiles] = useState([]);
  const [profileNames, setProfileNames] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);

  useEffect(() => {
    fetchData();
    fetchProfileNames();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getTop5();
      console.log('Fetched data:', data); // Log the fetched data
      setTopProfiles(data.top5Profiles);
      setWorstProfiles(data.worst5Profiles);
      setMostPopularProfiles(data.mostPopularProfiles);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  const fetchProfileNames = async () => {
    try {
      const names = await getProfileNames();
      console.log('Fetched profile names:', names); // Log the fetched profile names
      setProfileNames(names);
    } catch (error) {
      console.error('Error fetching profile names:', error);
    }
  };

  const handleSearch = (event) => {
    const input = event.target.value;
    setSearchQuery(input);

    if (input.length === 0) {
      setFilteredProfiles([]);
    }

    if (input.length > 0) {
      const results = profileNames.filter(profile =>
        profile.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredProfiles(results);
    }
  };

  const renderDiningHall = (diningHall) => (
    <div key={diningHall.name} className="dining-hall">
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
    <div className="wrapper">
      <Navbar />
      <div className="container">
        <h1 className="dininghalls-h1">Dining Halls</h1>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
        <SearchResults filteredProfiles={filteredProfiles} />
        <h2 className="dininghalls-h2">Recent Menu Options!</h2>
        <h2 className="dininghalls-h2">Top 5 Rated Dining Halls</h2>
        {topProfiles.map(renderDiningHall)}
        <h2 className="dininghalls-h2">Worst 5 Rated Dining Halls</h2>
        {worstProfiles.map(renderDiningHall)}
        <h2 className="dininghalls-h2">Top 5 Most Reviewed Dining Halls</h2>
        {mostPopularProfiles.map(renderDiningHall)}
      </div>
    </div>
  );
}

export default DiningHallsPage;
