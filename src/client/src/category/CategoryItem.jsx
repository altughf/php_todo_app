import React from 'react';
import { Link } from 'react-router-dom';

export default function CategoryItem({ category }) {
  return (
    <div className="flex justify-between gap-4 bg-white border border-gray-300 p-4 rounded-md">

      <div className='flex flex-col gap-2'>

        <div className="flex gap-2 items-center">
          <span className="text-sm text-gray-600 font-medium">Category Name:</span>
          <span className="text-sm text-gray-800 font-semibold">{category.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 font-medium">Category Color:</span>
          <div
            className="h-5 w-16 rounded border border-gray-300"
            style={{ backgroundColor: category.color || '#f3f4f6' }}
          ></div>
        </div>

      </div>

      <div className="flex gap-2 mt-2">
        <Link
          to={`/category/${category.id}`}
          className="flex justify-center items-center w-24 h-10 border border-sky-400 text-sky-600 hover:bg-sky-50 rounded text-sm"
        >
          Open
        </Link>
        <Link
          to={`/category/update/${category.id}`}
          className="flex justify-center items-center w-24 h-10 border border-gray-400 text-gray-700 hover:bg-gray-100 rounded text-sm"
        >
          Update
        </Link>

        <Link
          to={`/categories/${category.id}`}
          className="flex justify-center items-center w-24 h-10 border border-green-400 text-green-600 hover:bg-green-50 rounded text-sm"
        >
          Todos
        </Link>
      </div>

    </div>
  );
}
