import React, { useState } from 'react';
import { 
  FaEdit, 
  FaTrash, 
  FaTimes, 
  FaCheck,
  FaRegCircle,
  FaCheckCircle 
} from 'react-icons/fa';
import './TodoItem.css';

const TodoItem = ({ todo, onToggle, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (editText.trim() && editText !== todo.text) {
      onEdit(todo.id, editText);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <button
          className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}
          onClick={() => onToggle(todo.id)}
          aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {todo.completed ? (
            <FaCheckCircle className="checkbox-icon checked" />
          ) : (
            <FaRegCircle className="checkbox-icon" />
          )}
        </button>
        
        {isEditing ? (
          <input
            type="text"
            className="edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={handleKeyPress}
            autoFocus
          />
        ) : (
          <span 
            className="todo-text"
            onDoubleClick={handleDoubleClick}
          >
            {todo.text}
          </span>
        )}
      </div>

      <div className="todo-actions">
        {!isEditing && (
          <>
            <button 
              className="action-btn edit-btn"
              onClick={handleDoubleClick}
              title="Edit task"
              aria-label="Edit task"
            >
              <FaEdit className="action-icon" />
            </button>
            <button 
              className="action-btn delete-btn"
              onClick={() => onDelete(todo.id)}
              title="Delete task"
              aria-label="Delete task"
            >
              <FaTrash className="action-icon" />
            </button>
          </>
        )}
        
        {isEditing && (
          <button 
            className="action-btn cancel-btn"
            onClick={handleCancel}
            title="Cancel editing"
            aria-label="Cancel editing"
          >
            <FaTimes className="action-icon" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoItem;