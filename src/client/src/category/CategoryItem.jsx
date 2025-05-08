import React from 'react';

export default function CategoryItem({ category }) {
  return (
    <div
      className="p-4 rounded-md shadow-sm"
      style={{ backgroundColor: category.color || '#e5e5e5' }}
    >
      <h3 className="text-xl font-bold text-white">{category.name}</h3>
    </div>
  );
}
