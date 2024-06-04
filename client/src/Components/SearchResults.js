import React from 'react';
import { Link } from 'react-router-dom';
import './SearchResults.css';

const searchResults = ({ filteredprofiles }) => {
  return (
    <div className="search-results-container">
      <div className="search-results-dropdown">
          {filteredprofiles.map(name => (
            <div key={name} className="search-result-item">
                <Link
                  to={`/profile/${encodeURIComponent(name)}`}
                  style={{ textDecoration: "underline" }}
                >
                  {name}
                </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default searchResults;