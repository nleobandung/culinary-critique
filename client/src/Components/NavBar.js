import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import './NavBar.css';
import { getProfileNames } from '../api.js';
import SearchResults from './SearchResults';
import { UserDataContext } from "../context/UserDataProvider"

function NavBar() {
  const { userData } = useContext(UserDataContext);

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
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/create-food">Add Food Location</Link>
        </li>
        <li>
          <Link to="/explore">Explore</Link>
        </li>
        <li>
        <div className="about-user-wrapper">
          {userData.isLoggedIn ? (
            <Link to="/usr">Profile</Link>
          ) : (
            <Link to="/about">About</Link>
          )}
        </div>

        </li>
        <div className="nav-search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            className="nav-search"
          />
          <SearchResults filteredProfiles={filteredProfiles} />
        </div>
        <div className="nav-profile-wrapper">
          {userData.isLoggedIn ? (
            <Link to="/account-settings" className="nav-profile">Account</Link>
          ) : (
            <Link to="/login" className="nav-profile">Log In</Link>
          )}
        </div>
      </ul>
    </nav>
  );
}

export default NavBar;
