import React, { useEffect, useState } from 'react';

export default function ListTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTodos(data.information);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading todos...</div>;
  }

  return (

    <div className="flex justify-center items-center w-full rounded-lg bg-neutral-100 p-4 max-w-7xl m-auto">
    <div className="flex items-center w-full h-full max-w-3xl">

    {todos.length === 0 ? (

        <div>No todos found.</div>

    ) : (

        <div className="flex flex-col gap-4 font-poppins w-full">

            {todos.map((todo) => (
                <div key={todo.id} className="p-4 bg-neutral-200">
                    <h3 className="text-xl font-bold">{todo.title}</h3>
                    <p className="text-sm text-gray-600">{todo.description}</p>
                    <div className="mt-2 text-sm flex flex-wrap gap-4 text-gray-700">
                        <span>Status: <strong>{todo.status}</strong></span>
                        <span>Priority: <strong>{todo.priority}</strong></span>
                        <span>Due: <strong>{new Date(todo.due_date).toLocaleString()}</strong></span>
                    </div>
                </div>
            ))}

        </div>

    )}

    </div>
    </div>

  );
}
