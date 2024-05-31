import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from '../components/NavBar'
import Background from "../components/background";

function DiningHallsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [diningHalls, setDiningHalls] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const sampleData = [
      { name: "Bruin Plate", rating: 4.5, numReviews: 100 },
      { name: "De Neve", rating: 3.8, numReviews: 80 },
      { name: "Feast at Rieber", rating: 4.9, numReviews: 45}
    ];
    setDiningHalls(sampleData);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const renderDiningHall = (diningHall) => (
    <div key={diningHall.name}>
      <p>
        <Link
          to={diningHall.name === "Bruin Plate" ? "/profile" : "#"}
          style={{ textDecoration: "underline" }}
        >
          Name: {diningHall.name}
        </Link>
      </p>
      <p>Rating: {diningHall.rating}</p>
      <p>Number of Reviews: {diningHall.numReviews}</p>
    </div>
  );

  return (
    <div>
      <Background/>
      <Navbar/>
      <h1>Dining Halls</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <h2>Recent Menu Options!</h2>
      <h2>Top 5 Rated Dining Halls</h2>
      {diningHalls
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5)
        .map(renderDiningHall)}
      <h2>Worst 5 Rated Dining Halls</h2>
      {diningHalls
        .sort((a, b) => a.rating - b.rating)
        .slice(0, 5)
        .map(renderDiningHall)}
      <h2>Top 5 Most Reviewed Dining Halls</h2>
      {diningHalls
        .sort((a, b) => b.numReviews - a.numReviews)
        .slice(0, 5)
        .map(renderDiningHall)}
    </div>
  );
}

export default DiningHallsPage;