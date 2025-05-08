import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function OpenCategory() {
    const { id } = useParams();
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex items-center w-full rounded-lg bg-neutral-100 p-4 max-w-7xl m-auto">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold mb-2">{category.name}</h1>
                <p className="mb-1"><strong>Color:</strong> {category.color}</p>
                <p className="text-sm text-gray-500"><strong>Created At:</strong> {category.created_at}</p>
                <p className="text-sm text-gray-500"><strong>Updated At:</strong> {category.updated_at}</p>
            </div>
        </div>
    );
}
