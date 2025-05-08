import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function CreateCategory({ mode = 'add' }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [color, setColor] = useState('#FFFFFF');

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
    <div className="flex justify-center items-center w-full rounded-lg bg-neutral-100 p-4 max-w-7xl m-auto">
      <div className="relative flex items-start flex-col p-6 gap-5 w-96 h-full font-poppins bg-neutral-200">
        <div className="font-bold text-4xl mb-4">
          {mode === 'edit' ? 'Update Category' : 'Create Category'}
        </div>
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-xl font-bold" htmlFor="name">Name</label>
            <input
              id="name"
              className="default-input p-2 text-lg font-bold"
              type="text"
              placeholder="Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Color */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-xl font-bold" htmlFor="color">Color</label>
            <input
              id="color"
              className="default-input p-2 h-12"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>

          {/* Submit */}
          <button
            className="flex justify-center items-center cursor-pointer text-lg font-bold border p-3 bg-white h-12 w-full"
            type="submit"
          >
            {mode === 'edit' ? 'UPDATE' : 'ADD'}
          </button>
        </form>
      </div>
    </div>
  );
}
