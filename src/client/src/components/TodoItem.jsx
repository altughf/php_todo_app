import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TodoItem({ todo }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState(todo.status);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm("Bu todo öğesini silmek istediğinize emin misiniz?");
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/todos/${todo.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Todo başarıyla silindi.');
        window.location.reload();
      } else {
        alert('Silme işlemi başarısız oldu.');
      }
    } catch (error) {
      console.error('Hata:', error);
      alert('Silme sırasında bir hata oluştu.');
    }
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setIsUpdating(true);

    try {
      const response = await fetch(`/api/todos/${todo.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "todo-status": newStatus }),
      });

      const result = await response.json();

      if (response.ok && result.status === "success") {
        setStatus(newStatus);
      } else {
        alert("Durum güncellemesi başarısız oldu.");
      }
    } catch (error) {
      console.error("Durum güncellenirken hata oluştu:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="p-4 bg-neutral-200 rounded-md shadow">
      <h3 className="text-xl font-bold">{todo.title}</h3>
      <p className="text-sm text-gray-600">{todo.description}</p>

      <div className="mt-2 text-sm flex flex-wrap gap-4 text-gray-700">
        <div>
          Status:
          <select
            value={status}
            onChange={handleStatusChange}
            disabled={isUpdating}
            className="ml-2 p-1 rounded bg-white border"
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <span>Priority: <strong>{todo.priority}</strong></span>
        <span>Due: <strong>{new Date(todo.due_date).toLocaleString()}</strong></span>
      </div>

      {/* Kategoriler */}
      {todo.category_ids && todo.category_ids.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {todo.category_ids.map((cat) => (
            <span
              key={cat.id}
              className="text-xs px-2 py-1 rounded-md select-none"
              style={{
                backgroundColor: cat.color,
                color: '#fff',
              }}
            >
              {cat.name}
            </span>
          ))}
        </div>
      )}

      {/* Oluşturulma ve güncellenme tarihleri */}
      <div className="mt-3 text-xs text-gray-500">
        <p>Created: {new Date(todo.created_at).toLocaleString()}</p>
        <p>Updated: {new Date(todo.updated_at).toLocaleString()}</p>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
          onClick={() => navigate(`/update/${todo.id}`)}
        >
          Edit
        </button>
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
