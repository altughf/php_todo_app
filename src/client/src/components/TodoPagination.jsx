import React from 'react';

export default function TodoPagination({ pagination, onPageChange }) {
  const { current_page, last_page } = pagination;

  if (last_page <= 1) return null;

  const handleClick = (page) => {
    if (page !== current_page && page >= 1 && page <= last_page) {
      onPageChange(page);
    }
  };

  const pages = Array.from({ length: last_page }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {/* Previous */}
      <button
        onClick={() => handleClick(current_page - 1)}
        disabled={current_page === 1}
        className={`px-3 py-1 rounded border ${
          current_page === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-black'
        }`}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handleClick(page)}
          className={`px-3 py-1 rounded border ${
            page === current_page ? 'bg-blue-500 text-white' : 'bg-white text-black'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => handleClick(current_page + 1)}
        disabled={current_page === last_page}
        className={`px-3 py-1 rounded border ${
          current_page === last_page ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-black'
        }`}
      >
        Next
      </button>
    </div>
  );
}
