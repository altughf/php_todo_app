import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

export default function OpenCategory() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        fetch(`/api/categories/${id}`)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                if (data.status === 'success') {
                    setCategory(data.item);
                } else {
                    throw new Error('Category not found');
                }
            })
            .catch(error => setError(error.message))
            .finally(() => setLoading(false));
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;

        setDeleting(true);
        try {
            const response = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Delete operation failed');
            navigate('/categories');
        } catch (err) {
            alert('Error: ' + err.message);
        } finally {
            setDeleting(false);
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-center text-red-500 mt-10">Error: {error}</div>;

    return (
        <div className="w-full max-w-3xl mx-auto bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-semibold text-gray-800">{category.name}</h1>
                <p className="text-sm text-gray-500 mt-1"><strong>Color:</strong> {category.color}</p>
                <p className="text-sm text-gray-400 mt-1"><strong>Created At:</strong> {category.created_at}</p>
                <p className="text-sm text-gray-400"><strong>Updated At:</strong> {category.updated_at}</p>
            </div>

            <div className="flex gap-3">
                <Link
                    to={`/category/update/${category.id}`}
                    className="flex justify-center items-center w-24 h-10 border border-sky-400 text-sky-600 hover:bg-sky-50 rounded text-sm"
                >
                    Edit
                </Link>
                <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="flex justify-center items-center w-24 h-10 border border-gray-400 text-gray-700 hover:bg-gray-100 rounded text-sm"
                >
                    {deleting ? 'Deleting...' : 'Delete'}
                </button>
            </div>
        </div>
    );
}
