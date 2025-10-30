import { useCallback } from 'react';
import { generateId } from '../utils/helpers';

const useTodos = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = useCallback((text) => {
    const newTodo = {
      id: generateId(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      priority: 'medium'
    };
    setTodos(prev => [...prev, newTodo]);
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);

  const editTodo = useCallback((id, newText) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, text: newText.trim() } : todo
    ));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  }, []);

  return {
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
    clearCompleted,
    setTodos
  };
};

export default useTodos;