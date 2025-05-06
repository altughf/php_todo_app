import React from 'react';

export default function TodoListItem({ todo }) {
  return (
    <div className="p-4 bg-neutral-200">
      <h3 className="text-xl font-bold">{todo.title}</h3>
      <p className="text-sm text-gray-600">{todo.description}</p>
      <div className="mt-2 text-sm flex flex-wrap gap-4 text-gray-700">
        <span>Status: <strong>{todo.status}</strong></span>
        <span>Priority: <strong>{todo.priority}</strong></span>
        <span>Due: <strong>{new Date(todo.due_date).toLocaleString()}</strong></span>
      </div>
    </div>
  );
}
