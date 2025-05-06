import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (

        <div className="flex items-center w-full rounded-lg bg-neutral-100 p-4 max-w-7xl m-auto">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold mb-2">{todo.title}</h1>
                <p className="mb-1"><strong>Description:</strong> {todo.description}</p>
                <p className="mb-1"><strong>Status:</strong> {todo.status}</p>
                <p className="mb-1"><strong>Priority:</strong> {todo.priority}</p>
                <p className="mb-1"><strong>Due Date:</strong> {todo.due_date}</p>
                <p className="text-sm text-gray-500"><strong>Created At:</strong> {todo.created_at}</p>
            </div>
        </div>
    );
}
