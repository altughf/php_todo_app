import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import FormCategoryPage from './category/CategoryForm';
import ListCategoriesPage from './category/CategoriesListPage';
import OpenCategoryPage from './category/CategoryDetailPage';
import CategoryTodosPage from './category/CategoryTodosPage';

import FormTodoPage from './pages/TodoForm';
import ListTodosPage from './pages/TodoListPage';
import OpenTodoPage from './pages/TodoDetailPage';

import logo from './logo.svg';
import './styles/style.css';

function App() {
  return (
    <Router>
      <div>

        <div className="flex justify-center px-4 py-6 mb-5 bg-white shadow-sm">
          <div className="flex items-center justify-between w-full max-w-7xl">
            
            {/* LOGO */}
            <Link to="/">
              <img src={logo} alt="Logo" className="h-8" />
            </Link>

            {/* NAVIGATION */}
            <nav>
              <ul className="flex gap-4 text-base font-medium text-neutral-600">
                <li>
                  <Link
                    to="/add"
                    className="px-4 py-2 rounded-md hover:bg-neutral-100 transition-colors"
                  >
                    Add Todo
                  </Link>
                </li>
                <li>
                  <Link
                    to="/list"
                    className="px-4 py-2 rounded-md hover:bg-neutral-100 transition-colors"
                  >
                    List Todos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/category/add"
                    className="px-4 py-2 rounded-md hover:bg-neutral-100 transition-colors"
                  >
                    Add Category
                  </Link>
                </li>
                <li>
                  <Link
                    to="/categories"
                    className="px-4 py-2 rounded-md hover:bg-neutral-100 transition-colors"
                  >
                    Categories
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<ListTodosPage />} />
          <Route path="/add" element={<FormTodoPage mode="add" />} />
          <Route path="/list" element={<ListTodosPage />} />
          <Route path="/open/:id" element={<OpenTodoPage />} />
          <Route path="/update/:id" element={<FormTodoPage mode="edit" />} />

          <Route path="/category/add" element={<FormCategoryPage mode="add" />} />
          <Route path="/category/update/:id" element={<FormCategoryPage mode="edit" />} />

          <Route path="/categories" element={<ListCategoriesPage />} />
          <Route path="/category/:id" element={<OpenCategoryPage />} />

          <Route path="/categories/:id" element={<CategoryTodosPage />} />

        </Routes>

      </div>
    </Router>
  );
}

export default App;