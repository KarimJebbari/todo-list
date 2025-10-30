import React, { useState } from 'react';
import { FaPlus, FaTasks, FaPaperPlane } from 'react-icons/fa';
import './TodoForm.css';

const TodoForm = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (inputValue.trim()) {
      onAddTodo(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <FaTasks className="form-title-icon" />
        <h3 className="form-title">Add New Task</h3>
      </div>
      
      <div className="input-container">
        <div className={`input-wrapper ${isFocused ? 'focused' : ''} ${inputValue ? 'has-value' : ''}`}>
          <input
            type="text"
            className="todo-input"
            placeholder="What needs to be done today?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoFocus
          />
          <div className="input-icons">
            {inputValue && (
              <button 
                type="button"
                className="clear-button"
                onClick={() => setInputValue('')}
                aria-label="Clear input"
              >
                <FaPlus className="clear-icon" />
              </button>
            )}
          </div>
        </div>
        
        <button 
          type="submit" 
          className={`add-button ${inputValue.trim() ? 'active' : 'disabled'}`}
          disabled={!inputValue.trim()}
        >
          <FaPaperPlane className="button-icon" />
          <span className="button-text">Add Task</span>
        </button>
      </div>
      
      <div className="form-footer">
        <p className="form-hint">
          Press Enter to quickly add tasks
        </p>
      </div>
    </form>
  );
};

export default TodoForm;