import React, { useState } from 'react';
import { FaSearch, FaTimes, FaFilter, FaListAlt } from 'react-icons/fa';
import './SearchBar.css';

const SearchBar = ({ searchTerm, onSearchChange, resultsCount, totalCount }) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasSearch = searchTerm.trim().length > 0;

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleClear = () => {
    onSearchChange('');
    setIsFocused(false);
  };

  return (
    <div className="search-bar">
      <div className="search-header">
        <FaSearch className="search-title-icon" />
        <h3 className="search-title">Search Tasks</h3>
      </div>
      
      <div className="search-container">
        <div className={`search-input-wrapper ${isFocused ? 'focused' : ''} ${hasSearch ? 'has-results' : ''}`}>
          <FaSearch className="search-input-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by task name..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {hasSearch && (
            <button
              className="clear-search-btn"
              onClick={handleClear}
              title="Clear search"
              aria-label="Clear search"
            >
              <FaTimes className="clear-icon" />
            </button>
          )}
        </div>
        
        {hasSearch && (
          <div className="search-results-info">
            <div className="results-stats">
              <FaListAlt className="results-icon" />
              <span className="results-text">
                Found <strong>{resultsCount}</strong> of <strong>{totalCount}</strong> tasks
              </span>
            </div>
            <div className="results-percentage">
              <FaFilter className="percentage-icon" />
              <span className="percentage-text">
                {totalCount > 0 ? Math.round((resultsCount / totalCount) * 100) : 0}% match
              </span>
            </div>
          </div>
        )}
      </div>

      {!hasSearch && (
        <div className="search-hint">
          <p>Type to search through your tasks</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;