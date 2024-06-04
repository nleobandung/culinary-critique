import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './NavBar.css';
import { getProfileNames } from '../api.js';
import SearchResults from './SearchResults';

function NavBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [profileNames, setProfileNames] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);

  useEffect(() => {
    fetchProfileNames();
  }, []);

  const fetchProfileNames = async () => {
    try {
      const names = await getProfileNames();
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

  return (
    <nav className="nav">
      <div className="nav-logo">
        <Link to="/">Culinary Critique</Link>
      </div>
      <ul className="nav-menu">
        <li><Link to="/explore">Explore</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/login">Log In</Link></li>
      </ul>
      <div className="nav-profile-wrapper">
        <div className="nav-profile">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <SearchResults filteredProfiles={filteredProfiles} />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
