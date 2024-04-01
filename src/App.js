import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Input from "./components/Input/Input";
import List from './components/List/List'; 
import './App.scss';

function App() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = sessionStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [filter, setFilter] = useState('all');

  const addTodo = (text) => {
    const newTodo = { id: `todo-${Date.now()}`, text, completed: false };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const deleteCompletedTodos = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const clearAllTodos = () => {
    setTodos([]);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return; // dropped outside the list

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  // Calculate the number of active todos
  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  useEffect(() => {
    sessionStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app">
        <h1>To-Do List</h1>
        <p>{activeTodosCount} item{activeTodosCount !== 1 ? 's' : ''} left</p>
        <Input onAddTodo={addTodo} />
        <List todos={filteredTodos} onToggleTodo={toggleTodo} onRemoveTodo={removeTodo} />
        <div className="filters">
          <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
          <button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>Active</button>
          <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Completed</button>
        </div>
        <div className="actions">
          <button className="delete-completed" onClick={deleteCompletedTodos}>Delete Completed</button>
          <button className="clear-all" onClick={clearAllTodos}>Clear All</button>
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
