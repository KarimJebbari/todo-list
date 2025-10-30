import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { loadTodos, saveTodos } from '../utils/storage';

const TodoContext = createContext();

const todoReducer = (state, action) => {
  let newState;
  
  switch (action.type) {
    case 'SET_TODOS':
      newState = { ...state, todos: action.payload };
      break;
    case 'ADD_TODO':
      const newTodo = {
        id: Date.now() + Math.random().toString(36).substr(2, 9),
        text: action.payload,
        completed: false,
        createdAt: new Date().toISOString()
      };
      newState = { ...state, todos: [...state.todos, newTodo] };
      break;
    case 'DELETE_TODO':
      newState = { ...state, todos: state.todos.filter(todo => todo.id !== action.payload) };
      break;
    case 'TOGGLE_TODO':
      newState = {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        )
      };
      break;
    case 'EDIT_TODO':
      newState = {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
        )
      };
      break;
    case 'SET_FILTER':
      newState = { ...state, filter: action.payload };
      break;
    case 'SET_SEARCH_TERM':
      newState = { ...state, searchTerm: action.payload };
      break;
    case 'CLEAR_COMPLETED':
      newState = { ...state, todos: state.todos.filter(todo => !todo.completed) };
      break;
    default:
      return state;
  }
  saveTodos(newState.todos);
  return newState;
};

const initialState = {
  todos: [],
  filter: 'all',
  searchTerm: ''
};

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  useEffect(() => {
    const savedTodos = loadTodos();
    dispatch({ type: 'SET_TODOS', payload: savedTodos });
  }, []);

  const addTodo = (text) => {
    dispatch({ type: 'ADD_TODO', payload: text });
  };

  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const toggleTodo = (id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const editTodo = (id, text) => {
    dispatch({ type: 'EDIT_TODO', payload: { id, text } });
  };

  const setFilter = (filter) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  const setSearchTerm = (searchTerm) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: searchTerm });
  };

  const clearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };
  const getFilteredTodos = () => {
    let filtered = state.todos;
    switch (state.filter) {
      case 'active':
        filtered = filtered.filter(todo => !todo.completed);
        break;
      case 'completed':
        filtered = filtered.filter(todo => todo.completed);
        break;
      default:
        break;
    }
    if (state.searchTerm.trim()) {
      const searchLower = state.searchTerm.toLowerCase();
      filtered = filtered.filter(todo =>
        todo.text.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  };

  const value = {
    todos: state.todos,
    filteredTodos: getFilteredTodos(),
    filter: state.filter,
    searchTerm: state.searchTerm,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
    setFilter,
    setSearchTerm,
    clearCompleted
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};