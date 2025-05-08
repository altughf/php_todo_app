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
    <div className="flex justify-center items-center w-full rounded-lg bg-neutral-100 p-4 max-w-7xl m-auto">
      <div className="relative flex items-start flex-col p-6 gap-5 w-96 h-full font-poppins bg-neutral-200">
        <div className="font-bold text-4xl">
          {mode === 'edit' ? 'Update To Do!' : 'Create To Do!'}
        </div>
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          {/* Title */}
          <div className="flex flex-col gap-2 w-full">
            <div className="text-xl font-bold">Title</div>
            <input
              className="default-input p-2 text-lg font-bold"
              type="text"
              placeholder="Type Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2 w-full">
            <div className="text-xl font-bold">Description</div>
            <textarea
              className="default-input p-2 text-lg font-bold"
              placeholder="Type Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Status */}
          <div className="text-xl font-bold text-neutral-500">Status</div>
          <div className="flex flex-col bg-neutral-300 p-4 gap-2">
            {['pending', 'in_progress', 'completed', 'cancelled'].map((s) => (
              <label key={s} className="text-base font-medium flex items-center gap-2">
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

          {/* Priority */}
          <div className="text-xl font-bold text-neutral-500">Priority</div>
          <div className="flex flex-col bg-neutral-300 p-4 gap-2">
            {['low', 'medium', 'high'].map((p) => (
              <label key={p} className="text-base font-medium flex items-center gap-2">
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

          {/* Due Time */}
          <div className="text-xl font-bold text-neutral-500">Due Time</div>
          <div className="flex flex-col bg-neutral-300 p-4 gap-2">
            <input
              className="p-3 border focus:outline-none"
              type="datetime-local"
              name="todo-due-time"
              id="due-time"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
            />
          </div>

          {/* Categories */}
          <div className="text-xl font-bold text-neutral-500">Categories</div>
          <div className="flex flex-col bg-neutral-300 p-4 gap-2">
            {categories.map((cat) => (
              <label key={cat.id} className="text-base font-medium flex items-center gap-2">
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
