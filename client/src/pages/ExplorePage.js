import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { getProfileNamesAndImages } from '../api.js';
import './ExplorePage.css'; // Importing CSS for styling

// ExplorePage component
const ExplorePage = () => {
  const [profiles, setProfiles] = useState([]);

  const fetchProfiles = async () => {
    try {
      const data = await getProfileNamesAndImages();
      setProfiles(data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);
    
  // Card component to display individual dining hall information
  const Card = ({ name, avatar }) => {
    return (
      <div className="card">
        {/* Image for the dining hall */}
        <img src={avatar} alt={`${name} Avatar`} style={{width: '100%'}} />
        <div className="container">
          <h4>
            {/* Link to the profile page of the dining hall */}
            <Link
              to={`/profile/${encodeURIComponent(name)}`}
              className="link-text"
            >
              {name}
            </Link>
          </h4>
        </div>
      </div>
    );
  };

  return (
    <div className="explore-page">
      {/* Rendering Card components for each dining hall */}
      {profiles.map(profile => (
        <Card key={profile.name} name={profile.name} avatar={profile.imageLink} />
      ))}
    </div>
  );
};

export default ExplorePage; // Exporting the ExplorePage component
