import React from 'react';
import { FaListAlt, FaClock, FaCheckCircle, FaFilter } from 'react-icons/fa';
import { FILTER_TYPES } from '../../utils/constants';
import './FilterButtons.css';

const FilterButtons = ({ currentFilter, onFilterChange }) => {
  const filters = [
    { 
      key: FILTER_TYPES.ALL, 
      label: 'All Tasks', 
      icon: FaListAlt,
      description: 'Show all tasks'
    },
    { 
      key: FILTER_TYPES.ACTIVE, 
      label: 'Active', 
      icon: FaClock,
      description: 'Show pending tasks only'
    },
    { 
      key: FILTER_TYPES.COMPLETED, 
      label: 'Completed', 
      icon: FaCheckCircle,
      description: 'Show finished tasks only'
    }
  ];

  const getFilterIcon = (filter, isActive) => {
    const IconComponent = filter.icon;
    return (
      <IconComponent 
        className={`filter-icon ${isActive ? 'active' : ''}`}
      />
    );
  };

  return (
    <div className="filter-buttons">
      <div className="filter-header">
        <FaFilter className="filter-title-icon" />
        <h3 className="filter-title">Filter Tasks</h3>
      </div>
      
      <div className="filter-options">
        {filters.map(filter => {
          const isActive = currentFilter === filter.key;
          return (
            <button
              key={filter.key}
              onClick={() => onFilterChange(filter.key)}
              className={`filter-btn ${isActive ? 'active' : ''}`}
              title={filter.description}
              aria-label={filter.description}
            >
              <div className="filter-btn-content">
                <div className="filter-icon-wrapper">
                  {getFilterIcon(filter, isActive)}
                </div>
                <div className="filter-text">
                  <span className="filter-label">{filter.label}</span>
                  <span className="filter-description">{filter.description}</span>
                </div>
                {isActive && (
                  <div className="active-indicator"></div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterButtons;