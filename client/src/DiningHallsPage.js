import React, { useState, useEffect } from "react";

function DiningHallsPage({ switchToProfilePage }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [diningHalls, setDiningHalls] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const sampleData = [
      { name: "Bruin Plate", rating: 4.5, numReviews: 100 },
      { name: "Dining Hall 2", rating: 3.8, numReviews: 80 },
    ];
    setDiningHalls(sampleData);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const renderDiningHall = (diningHall) => (
    <div key={diningHall.name}>
            <p>
        <span
          style={{ cursor: "pointer", textDecoration: "underline" }}
          onClick={() => {
            if (diningHall.name === "Bruin Plate") {
              switchToProfilePage();
            }
          }}
        >
          Name: {diningHall.name}
        </span>
      </p>
      <p>Rating: {diningHall.rating}</p>
      <p>Number of Reviews: {diningHall.numReviews}</p>
    </div>
  );

  return (
    <div>
      <h1>Dining Halls</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <h2>Top 5 Rated Dining Halls</h2>
      {diningHalls
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5)
        .map(renderDiningHall)}
      <h2>Bottom 5 Rated Dining Halls</h2>
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