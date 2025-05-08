import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import FormCategoryPage from './category/CategoryForm';
import ListCategoriesPage from './category/CategoriesListPage';
import OpenCategoryPage from './category/CategoryDetailPage';

import FormTodoPage from './pages/TodoForm';
import ListTodosPage from './pages/TodoListPage';
import OpenTodoPage from './pages/TodoDetailPage';

import logo from './logo.svg';
import './styles/style.css';

function App() {
  return (
    <Router>
      <div>

        <div className="flex justify-center items-center p-4">

          <div className="flex justify-between items-center w-full h-28 rounded-lg bg-neutral-200 p-6 max-w-7xl">

          {/* LOGO */}
          <Link to="/">
            <img src={logo} alt="Logo" className="h-9 w-full" />
          </Link>

          {/* NAVIGATION */}
          <nav>
            <ul className="font-poppins font-bold text-xl flex gap-3 list-none p-0">
              <li>
                <Link to="/add" className="p-4 rounded-lg bg-neutral-100 text-neutral-500">Add Todo</Link>
              </li>
              <li>
                <Link to="/list" className="p-4 rounded-lg bg-neutral-100 text-neutral-500">List Todos</Link>
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

        </Routes>

      </div>
    </Router>
  );
}

export default App;