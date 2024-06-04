import React from 'react';
import { Link } from 'react-router-dom';
import './SearchResults.css';

const SearchResults = ({ filteredProfiles }) => {
  return (
    <div className="search-results-container">
      <div className="search-results-dropdown">
        {filteredProfiles.map(name => (
          <div key={name} className="search-result-item">
            <Link to={`/profile/${encodeURIComponent(name)}`}>
              {name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
