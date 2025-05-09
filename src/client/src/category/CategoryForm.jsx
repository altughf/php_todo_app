import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function CreateCategory({ mode = 'add' }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [color, setColor] = useState('#FFFFFF');
  const [error, setError] = useState('');

  useEffect(() => {
    if (mode === 'edit' && id) {
      const fetchCategory = async () => {
        try {
          const response = await fetch(`/api/categories/${id}`);
          if (!response.ok) throw new Error(`Error: ${response.status}`);
          const data = await response.json();

          const category = data.item;
          setName(category.name || '');
          setColor(category.color || '#FFFFFF');
        } catch (err) {
          console.error('Fetch error:', err);
        }
      };
      fetchCategory();
    }
  }, [mode, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!name.trim()) {
      setError('Name is required');
      return;
    } else if (name.trim().length < 3) {
      setError('Name must be at least 3 characters');
      return;
    } else {
      setError('');
    }

    const payload = {
      'category-name': name.trim(),
      'category-color': color.trim(),
    };

    try {
      const url = mode === 'edit' ? `/api/categories/${id}` : '/api/categories';
      const method = mode === 'edit' ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      console.log(`Category ${mode === 'edit' ? 'updated' : 'created'}:`, data);

      navigate('/categories');
    } catch (err) {
      console.error('Submission error:', err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-100 px-4">
      <div className="flex flex-col w-full max-w-md rounded-2xl shadow-lg bg-white p-8 space-y-6">
        <h2 className="text-3xl font-semibold text-neutral-800">
          {mode === 'edit' ? 'Update Category' : 'Create Category'}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
          {/* Name */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="text-lg font-medium text-neutral-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Category Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                // Clear error when user starts typing
                if (error) setError('');
              }}
              className="px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-900"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          {/* Color */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="color" className="text-lg font-medium text-neutral-700">
              Color
            </label>
            <input
              id="color"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-16 h-10 p-1 rounded-md border border-neutral-300 cursor-pointer"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-2 w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            {mode === 'edit' ? 'UPDATE' : 'ADD'}
          </button>
        </form>
      </div>
    </div>
  );
}