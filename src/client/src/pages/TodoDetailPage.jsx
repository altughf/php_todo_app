import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

export default function OpenTodo() {
    const { id } = useParams();
    const [todo, setTodo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`/api/todos/${id}`)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                if (data.status === 'success') {
                    setTodo(data.item);
                } else {
                    throw new Error('Todo not found');
                }
            })
            .catch(error => setError(error.message))
            .finally(() => setLoading(false));
    }, [id]);

    const handleDelete = async () => {
        const confirmed = window.confirm("Bu todo öğesini silmek istediğinize emin misiniz?");
        if (!confirmed) return;

        try {
            const response = await fetch(`/api/todos/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Todo başarıyla silindi.');
                window.location.href = '/list'; // Redirect to the todos list
            } else {
                alert('Silme işlemi başarısız oldu.');
            }
        } catch (error) {
            console.error('Hata:', error);
            alert('Silme sırasında bir hata oluştu.');
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-red-600 text-center mt-4">Error: {error}</div>;

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg my-8">
            <div className="space-y-4">
                <h1 className="text-3xl font-semibold text-gray-900">{todo.title}</h1>
                <p className="text-gray-600 text-sm">{todo.description}</p>
                <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Status:</strong> {todo.status}</p>
                    <p><strong>Priority:</strong> {todo.priority}</p>
                    <p><strong>Due Date:</strong> {new Date(todo.due_date).toLocaleString()}</p>
                    <p className="text-xs text-gray-500"><strong>Created At:</strong> {new Date(todo.created_at).toLocaleString()}</p>
                </div>

                <div className="mt-6 flex gap-4">
                    <Link
                        to={`/update/${todo.id}`}
                        className="flex justify-center items-center w-32 h-10 border border-sky-400 text-sky-600 hover:bg-sky-50 rounded text-sm"
                    >
                        Edit
                    </Link>
                    <button
                        className="flex justify-center items-center w-32 h-10 border border-gray-400 text-gray-700 hover:bg-gray-100 rounded text-sm"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
