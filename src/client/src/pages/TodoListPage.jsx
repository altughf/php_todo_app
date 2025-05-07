import React, { useEffect, useState, useCallback } from 'react';
import TodoItem from '../components/TodoItem';
import TodoListFilter from '../components/TodoFilter';

export default function ListTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    sort: 'due_date',
    order: 'asc',
    status: '',
    priority: '',
    q: ''
  });

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams(filters).toString();
      const url = query ? `/api/todos?${query}` : '/api/todos';
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTodos(data.information);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div className="flex flex-col items-center w-full rounded-lg bg-neutral-100 p-4 max-w-7xl m-auto">
      <TodoListFilter filters={filters} setFilters={setFilters} />

      <div className="flex items-center w-full h-full max-w-3xl">
        {loading ? (
          <div className="text-center p-4">Loading todos...</div>
        ) : todos.length === 0 ? (
          <div className="text-center p-4">No todos found.</div>
        ) : (
          <div className="flex flex-col gap-4 font-poppins w-full">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
