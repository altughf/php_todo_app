import React, { useEffect, useState, useCallback, useRef } from 'react';
import TodoItem from '../components/TodoItem';
import TodoListFilter from '../components/TodoFilter';
import TodoPagination from '../components/TodoPagination';
import LoadingSpinner from '../components/LoadingSpinner';

export default function ListTodos() {
  const [todos, setTodos] = useState([]);
  const [pagination, setPagination] = useState(null);
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

  const previousFiltersRef = useRef(filters);

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

      console.log('API response information :');
      console.log(data);

      setTodos(data.information);
      setPagination(data.meta.pagination);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const prev = previousFiltersRef.current;

    const filterKeys = ['status', 'priority', 'q', 'sort', 'order', 'limit'];
    const filtersChanged = filterKeys.some((key) => filters[key] !== prev[key]);

    if (filtersChanged) {
      setFilters((prev) => ({ ...prev, page: 1 }));
    } else {
      fetchTodos();
    }

    previousFiltersRef.current = filters;
  }, [filters, fetchTodos]);

  const handlePageChange = (page) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  return (
    <div className="flex flex-col items-center w-full rounded-lg bg-neutral-100 p-4 max-w-7xl m-auto">
      <TodoListFilter filters={filters} setFilters={setFilters} />

      <div className="flex justify-center items-center w-full h-full max-w-3xl">
        {loading ? (
          <LoadingSpinner />
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

      {pagination && (
        <TodoPagination pagination={pagination} onPageChange={handlePageChange} />
      )}
    </div>
  );
}
