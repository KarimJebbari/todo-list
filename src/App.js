import React from 'react';
import { TodoProvider, useTodo } from './contexts/TodoContext';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import SearchBar from './components/SearchBar';
import FilterButtons from './components/FilterButtons';
import TodoList from './components/TodoList';
import './App.css';

const AppContent = () => {
  const { 
    todos, 
    filteredTodos,
    filter, 
    searchTerm,
    addTodo, 
    toggleTodo, 
    editTodo, 
    deleteTodo, 
    setFilter, 
    setSearchTerm,
    clearCompleted 
  } = useTodo();

  return (
    <div className="app">
      <div className="app-background">
        <div className="floating-elements">
          <div className="floating-element element-1"></div>
          <div className="floating-element element-2"></div>
          <div className="floating-element element-3"></div>
          <div className="floating-element element-4"></div>
        </div>
      </div>
      
      <div className="container">
        <Header 
          todos={todos}
          onClearCompleted={clearCompleted}
        />
        
        <main className="main-content">
          <div className="content-section">
            <TodoForm onAddTodo={addTodo} />
          </div>
          
          <div className="content-section">
            <SearchBar 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              resultsCount={filteredTodos.length}
              totalCount={todos.length}
            />
          </div>
          
          <div className="content-section">
            <FilterButtons 
              currentFilter={filter}
              onFilterChange={setFilter}
            />
          </div>
          
          <div className="content-section">
            <TodoList
              todos={todos}
              filteredTodos={filteredTodos}
              filter={filter}
              searchTerm={searchTerm}
              onToggleTodo={toggleTodo}
              onEditTodo={editTodo}
              onDeleteTodo={deleteTodo}
            />
          </div>
        </main>
        
        <footer className="app-footer">
          <div className="footer-content">
            <p className="footer-text">
               Built with React
            </p>
            <div className="footer-stats">
              <span className="footer-stat">
                {todos.length} Total Tasks
              </span>
              <span className="footer-stat">
                {todos.filter(t => !t.completed).length} Remaining
              </span>
              <span className="footer-stat">
                {todos.filter(t => t.completed).length} Completed
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

function App() {
  return (
    <TodoProvider>
      <AppContent />
    </TodoProvider>
  );
}

export default App;