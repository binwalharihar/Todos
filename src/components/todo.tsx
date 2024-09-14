import React from 'react';

enum Priority {
  Low,
  Medium,
  High,
}

interface TodoProps {
  task: {
    id: number;
    title: string;
    description: string;
    dueDate: Date;
    priority: Priority; 
    completed: boolean;
  };
  deleteTodo: (id: number) => void;
  editTodo: (id: number) => void;
  toggleComplete: (id: number) => void;
}

export const Todo = ({
  task,
  deleteTodo,
  editTodo,
  toggleComplete,
}: TodoProps) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col space-y-4">
      <h3
        className={`text-lg font-bold ${
          task.completed ? 'line-through text-gray-400' : ''
        }`}>
        {task.title}
      </h3>
      <p className="text-gray-600">{task.description}</p>
      <p className="text-sm text-gray-500">
        Due Date: {task.dueDate.toLocaleDateString()}
      </p>
      <p
        className={`text-sm font-semibold ${
          task.priority === Priority.High
            ? 'text-red-600'
            : task.priority === Priority.Medium
            ? 'text-yellow-600'
            : 'text-green-600'
        }`}>
        Priority: {task.priority}
      </p>

      <div className="flex space-x-2">
        <button
          onClick={() => toggleComplete(task.id)}
          className={`px-4 py-2 text-white rounded ${
            task.completed ? 'bg-blue-500' : 'bg-green-500'
          }`}>
          {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
        <button
          onClick={() => editTodo(task.id)}
          className="px-4 py-2 bg-yellow-500 text-white rounded">
          Edit
        </button>
        <button
          onClick={() => deleteTodo(task.id)}
          className="px-4 py-2 bg-red-500 text-white rounded">
          Delete
        </button>
      </div>
    </div>
  );
};
