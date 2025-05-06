import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TodoListItem({ todo }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmed = window.confirm("Bu todo öğesini silmek istediğinize emin misiniz?");
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/todos/${todo.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Todo başarıyla silindi.');
        // Sayfayı yenilemek veya üst componente haber vermek gerekebilir
        window.location.reload(); // ya da bir prop ile parent component'e bildirilebilir
      } else {
        alert('Silme işlemi başarısız oldu.');
      }
    } catch (error) {
      console.error('Hata:', error);
      alert('Silme sırasında bir hata oluştu.');
    }
  };

  return (
    <div className="p-4 bg-neutral-200 rounded-md shadow">
      <h3 className="text-xl font-bold">{todo.title}</h3>
      <p className="text-sm text-gray-600">{todo.description}</p>
      <div className="mt-2 text-sm flex flex-wrap gap-4 text-gray-700">
        <span>Status: <strong>{todo.status}</strong></span>
        <span>Priority: <strong>{todo.priority}</strong></span>
        <span>Due: <strong>{new Date(todo.due_date).toLocaleString()}</strong></span>
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
