import React from 'react';
import { 
  FaSearch, 
  FaCheckCircle, 
  FaClock, 
  FaListAlt,
  FaInbox,
  FaFilter,
  FaTasks
} from 'react-icons/fa';
import TodoItem from '../TodoItem';
import './TodoList.css';
const TodoList = ({ todos, filteredTodos, onToggleTodo, onEditTodo, onDeleteTodo, filter, searchTerm }) => {
  const hasSearch = searchTerm.trim().length > 0;
  const getHeaderIcon = () => {
    if (hasSearch) {
      return <FaSearch className="header-icon search-icon" />;
    }
    
    switch (filter) {
      case 'active':
        return <FaClock className="header-icon active-icon" />;
      case 'completed':
        return <FaCheckCircle className="header-icon completed-icon" />;
      default:
        return <FaListAlt className="header-icon all-icon" />;
    }
  };
  const getEmptyIcon = () => {
    if (hasSearch) {
      return <FaSearch className="empty-icon search-empty-icon" />;
    }
    
    switch (filter) {
      case 'active':
        return <FaCheckCircle className="empty-icon active-empty-icon" />;
      case 'completed':
        return <FaTasks className="empty-icon completed-empty-icon" />;
      default:
        return <FaInbox className="empty-icon all-empty-icon" />;
    }
  };

  const getEmptyMessage = () => {
    if (hasSearch) {
      return "No tasks found";
    }
    
    switch (filter) {
      case 'active':
        return "No active tasks!";
      case 'completed':
        return "No completed tasks yet";
      default:
        return "No tasks yet";
    }
  };

  const getEmptyDescription = () => {
    if (hasSearch) {
      return `No tasks found for "${searchTerm}". Try different keywords.`;
    }
    
    return filter === 'all' 
      ? "Start by adding your first task above!" 
      : `Switch to another filter to see ${filter === 'active' ? 'completed' : 'active'} tasks`;
  };

  const getHeaderTitle = () => {
    if (hasSearch) {
      return 'Search Results';
    }
    
    switch (filter) {
      case 'active':
        return 'Active Tasks';
      case 'completed':
        return 'Completed Tasks';
      default:
        return 'All Tasks';
    }
  };

  // Get subtitle
  const getSubtitle = () => {
    if (hasSearch) {
      return `Found ${filteredTodos.length} task${filteredTodos.length !== 1 ? 's' : ''} matching "${searchTerm}"`;
    }
    
    return `${todos.filter(t => !t.completed).length} tasks remaining`;
  };

  if (filteredTodos.length === 0) {
    return (
      <div 
        className="empty-state" 
        data-filter={filter}
        data-search={hasSearch.toString()}
      >
        {getEmptyIcon()}
        <h3>{getEmptyMessage()}</h3>
        <p>{getEmptyDescription()}</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      <div 
        className="todo-list-header"
        data-filter={filter}
        data-search={hasSearch.toString()}
      >
        <h2>
          {getHeaderIcon()}
          {getHeaderTitle()} 
          <span className="tasks-count">({filteredTodos.length})</span>
        </h2>
        <p className="todo-list-subtitle">
          <FaFilter className="subtitle-icon" />
          {getSubtitle()}
        </p>
      </div>
      
      <div className="todos-container">
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggleTodo}
            onEdit={onEditTodo}
            onDelete={onDeleteTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;