import { useState, useEffect } from 'react';
import { Todo } from '../types/todo';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      status: 'todo',
      createdAt: new Date(),
      previousStatus: 'todo'
    };
    setTodos([...todos, newTodo]);
  };

  const updateTodoStatus = (todoId: string, newStatus: Todo['status']) => {
    setTodos(todos.map(todo => {
      if (todo.id === todoId) {
        // Don't allow moving from done to frozen
        if (todo.status === 'done' && newStatus === 'frozen') {
          return todo;
        }
        
        // Store previous status when freezing
        if (newStatus === 'frozen') {
          return { ...todo, status: newStatus, previousStatus: todo.status };
        }
        
        // Restore previous status when unfreezing
        if (todo.status === 'frozen' && newStatus === 'todo') {
          return { ...todo, status: todo.previousStatus || 'todo' };
        }
        
        return { ...todo, status: newStatus };
      }
      return todo;
    }));
  };

  const deleteTodo = (todoId: string) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  return {
    todos,
    addTodo,
    updateTodoStatus,
    deleteTodo
  };
}