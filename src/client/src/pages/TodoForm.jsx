import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function CreateTodo({ mode = 'add' }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [priority, setPriority] = useState('medium');
  const [dueTime, setDueTime] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);

  useEffect(() => {
    if (mode === 'edit' && id) {
      const fetchTodo = async () => {
        try {
          const response = await fetch(`/api/todos/${id}`);
          if (!response.ok) throw new Error(`Error: ${response.status}`);
          let data = await response.json();

          data = data.item;

          setTitle(data['title'] || '');
          setDescription(data['description'] || '');
          setStatus(data['status'] || 'pending');
          setPriority(data['priority'] || 'medium');
          setDueTime(data['due_date']?.slice(0, 16) || '');
          setSelectedCategoryIds((data.categories || []).map((c) => c.id));
        } catch (err) {
          console.error('Fetch error:', err);
        }
      };
      fetchTodo();
    }
  }, [mode, id]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        const data = await res.json();
        setCategories(data.information || []);
      } catch (err) {
        console.error('Category fetch error:', err);
      }
    };

    fetchCategories();
  }, []);

  // Toggle category selection
  const toggleCategorySelection = (catId) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(catId)
        ? prev.filter((id) => id !== catId)
        : [...prev, catId]
    );
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      'todo-title': title,
      'todo-description': description,
      'todo-status': status,
      'todo-priority': priority,
      'todo-due-time': dueTime,
      'todo-category-ids': selectedCategoryIds,
    };

    try {
      const url = mode === 'edit' ? `/api/todos/${id}` : '/api/todos';
      const method = mode === 'edit' ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      console.log(`Todo ${mode === 'edit' ? 'updated' : 'created'}:`, data);

      navigate('/list');
    } catch (err) {
      console.error('Submission error:', err);
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-neutral-100 px-4">
      <div className="flex flex-col w-full max-w-xl p-8 rounded-xl shadow-md bg-white gap-6">
        <h2 className="text-3xl font-semibold text-gray-800">
          {mode === 'edit' ? 'Update To Do!' : 'Create To Do!'}
        </h2>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* Title */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Title</label>
            <input
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Type Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Type Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Status */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">Status</span>
            <div className="flex flex-col gap-2 p-3 bg-neutral-100 rounded-md">
              {['pending', 'in_progress', 'completed', 'cancelled'].map((s) => (
                <label key={s} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="todo-status"
                    value={s}
                    checked={status === s}
                    onChange={() => setStatus(s)}
                  />
                  {s.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                </label>
              ))}
            </div>
          </div>

          {/* Priority */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">Priority</span>
            <div className="flex flex-col gap-2 p-3 bg-neutral-100 rounded-md">
              {['low', 'medium', 'high'].map((p) => (
                <label key={p} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="todo-priority"
                    value={p}
                    checked={priority === p}
                    onChange={() => setPriority(p)}
                  />
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </label>
              ))}
            </div>
          </div>

          {/* Due Time */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Due Time</label>
            <input
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              type="datetime-local"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
            />
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">Categories</span>
            <div className="flex flex-col gap-2 p-3 bg-neutral-100 rounded-md">
              {categories.map((cat) => (
                <label key={cat.id} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    value={cat.id}
                    checked={selectedCategoryIds.includes(cat.id)}
                    onChange={() => toggleCategorySelection(cat.id)}
                  />
                  {cat.name}
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            className="mt-2 py-3 px-5 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 transition"
            type="submit"
          >
            {mode === 'edit' ? 'UPDATE' : 'ADD'}
          </button>
        </form>
      </div>
    </div>
  );
}
