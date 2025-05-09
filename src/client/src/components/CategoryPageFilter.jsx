import React from 'react';

export default function CategoryPageFilter({ filters, setFilters }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-white rounded shadow mb-4">
      {/* Status filter */}
      <select name="status" value={filters.status} onChange={handleChange} className="p-2 border rounded">
        <option value="">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>

      {/* Sort by */}
      <select name="sort" value={filters.sort} onChange={handleChange} className="p-2 border rounded">
        <option value="due_date">Due Date</option>
        <option value="created_at">Created At</option>
      </select>

      {/* Order */}
      <select name="order" value={filters.order} onChange={handleChange} className="p-2 border rounded">
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      {/* Limit */}
      <select name="limit" value={filters.limit} onChange={handleChange} className="p-2 border rounded">
        {[10, 20, 30, 40, 50].map((n) => (
          <option key={n} value={n}>{n} per page</option>
        ))}
      </select>
    </div>
  );
}
