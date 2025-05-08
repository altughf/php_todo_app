import React, { useEffect, useState } from 'react';
import CategoryItem from './CategoryItem';

export default function CategoryListPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCategories(data.information); // assuming 'information' holds the category list
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading categories...</div>;
  }

  return (
    <div className="flex justify-center items-center w-full rounded-lg bg-neutral-100 p-4 max-w-7xl m-auto">
      <div className="flex items-center w-full h-full max-w-3xl">
        {categories.length === 0 ? (
          <div>No categories found.</div>
        ) : (
          <div className="flex flex-col gap-4 font-poppins w-full">
            {categories.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
