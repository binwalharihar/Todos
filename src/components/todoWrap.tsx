import React, { useState } from 'react';
import { Todo } from './todo';
import { TodoForm } from './todoForm';
import { v4 as uuidv4 } from 'uuid';
import { EditTodoForm } from './editTodo';
import { sortByPriority } from './PriorityQueue'; // Import the sorting function

export const Todowrap = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');

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

  // Sort the filtered todos based on priority
  const sortedTodos = sortByPriority(filteredTodos);

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

      <TodoForm addTodo={addTodo} />

      {/* Task List */}
      <div className="mt-8 space-y-4">
        {sortedTodos.length === 0 ? (
          <p className="text-gray-600">No tasks available. Add a task to get started!</p>
        ) : (
          sortedTodos.map((todo) =>
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
