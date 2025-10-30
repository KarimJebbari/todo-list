import React from 'react';
import { 
  FaCheckCircle, 
  FaClock, 
  FaListAlt, 
  FaTrash, 
  FaRocket, 
  FaTrophy, 
  FaFire, 
  FaStar,
  FaBolt,
  FaTasks
} from 'react-icons/fa';
import './Header.css';

const Header = ({ todos, onClearCompleted }) => {
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const pendingTodos = totalTodos - completedTodos;

  const getProductivityMessage = () => {
    if (totalTodos === 0) return "Let's get started!";
    if (completedTodos === totalTodos) return "Amazing! All done!";
    if (completedTodos === 0) return "You can do it!";
    if (completedTodos / totalTodos > 0.7) return "Almost there!";
    return "Keep going!";
  };

  const getProductivityIcon = () => {
    if (totalTodos === 0) return <FaRocket className="productivity-icon rocket" />;
    if (completedTodos === totalTodos) return <FaTrophy className="productivity-icon trophy" />;
    if (completedTodos === 0) return <FaBolt className="productivity-icon bolt" />;
    if (completedTodos / totalTodos > 0.7) return <FaFire className="productivity-icon fire" />;
    return <FaStar className="productivity-icon star" />;
  };

  const getCompletionPercentage = () => {
    return totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-main">
          <div className="header-title">
            <FaTasks className="header-logo" />
            <div className="title-content">
              <h1>Todo List App</h1>
              <div className="productivity-message">
                {getProductivityIcon()}
                <p>{getProductivityMessage()}</p>
              </div>
            </div>
          </div>
          
          <div className="header-stats">
            <div className="stats-grid">
              <div className="stat-item pending">
                <FaClock className="stat-icon pending-icon" />
                <div className="stat-content">
                  <span className="stat-number">{pendingTodos}</span>
                  <span className="stat-label">Pending</span>
                </div>
              </div>
              
              <div className="stat-item completed">
                <FaCheckCircle className="stat-icon completed-icon" />
                <div className="stat-content">
                  <span className="stat-number">{completedTodos}</span>
                  <span className="stat-label">Completed</span>
                </div>
              </div>
              
              <div className="stat-item total">
                <FaListAlt className="stat-icon total-icon" />
                <div className="stat-content">
                  <span className="stat-number">{totalTodos}</span>
                  <span className="stat-label">Total</span>
                </div>
              </div>
            </div>

            {totalTodos > 0 && (
              <div className="completion-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${getCompletionPercentage()}%` }}
                  ></div>
                </div>
                <span className="progress-text">{getCompletionPercentage()}% Complete</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {completedTodos > 0 && (
        <div className="header-actions">
          <button 
            className="clear-completed-btn"
            onClick={onClearCompleted}
            title="Remove all completed tasks"
          >
            <FaTrash className="clear-icon" />
            <span className="clear-text">Clear Completed</span>
            <span className="clear-count">({completedTodos})</span>
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;