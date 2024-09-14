import React, { useState } from 'react';
import { Todo } from './todo';
import { TodoForm } from './todoForm';
import { v4 as uuidv4 } from 'uuid';
import { EditTodoForm } from './editTodo';

export const Todowrap = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All'); // Priority filter state

  const addTodo = (newTask) => {
    setTodos([
      ...todos,
      { id: uuidv4(), ...newTask, completed: false, isEditing: false },
    ]);
  };

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (updatedTask, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, ...updatedTask, isEditing: false } : todo
      )
    );
  };

  const handleFilter = (status) => {
    setFilterStatus(status);
  };

  // Filter and sort todos based on search term, status, and priority
  const filteredTodos = todos
    .filter(
      (todo) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((todo) => {
      if (filterStatus === 'Completed') return todo.completed;
      if (filterStatus === 'Incomplete') return !todo.completed;
      return true;
    })
    .filter((todo) => {
      if (filterPriority === 'All') return true;
      return todo.priority === filterPriority;
    });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Manage Tasks</h1>

      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search tasks..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Filter buttons */}
      <div className="mb-4 flex space-x-2">
        <button
          onClick={() => handleFilter('All')}
          className={`px-4 py-2 rounded ${
            filterStatus === 'All'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-black'
          }`}>
          All
        </button>
        <button
          onClick={() => handleFilter('Completed')}
          className={`px-4 py-2 rounded ${
            filterStatus === 'Completed'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-black'
          }`}>
          Completed
        </button>
        <button
          onClick={() => handleFilter('Incomplete')}
          className={`px-4 py-2 rounded ${
            filterStatus === 'Incomplete'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-black'
          }`}>
          Incomplete
        </button>
      </div>

      {/* Priority Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Filter by Priority:</label>
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
          <option value="All">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* Add Todo Form */}
      <TodoForm addTodo={addTodo} />

      {/* Task List */}
      <div className="mt-8 space-y-4">
        {filteredTodos.length === 0 ? (
          <p className="text-gray-600">No tasks available. Add a task to get started!</p>
        ) : (
          filteredTodos.map((todo) =>
            todo.isEditing ? (
              <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
            ) : (
              <Todo
                key={todo.id}
                task={todo}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
                toggleComplete={toggleComplete}
              />
            )
          )
        )}
      </div>
    </div>
  );
};
