import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const Navbar = () => {
  return (
    <div className="nav">
      <div className="nav-logo">Culinary-Critique</div>
      <ul className="nav-menu">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/dining-halls">Explore</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li className="nav-profile">
          <Link to="/login">Log In</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;