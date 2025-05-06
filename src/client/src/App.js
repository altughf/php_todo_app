import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddTodo from './pages/AddTodo';
import ListTodos from './pages/ListTodos';
import OpenTodo from './pages/OpenTodo';
import UpdateTodo from './pages/UpdateTodo';
import './styles/style.css';

function App() {
  return (
    <Router>
      <div>

        <div className="flex justify-center items-center p-4">

          <div className="flex justify-between items-center w-full h-28 rounded-lg bg-neutral-200 p-6 max-w-7xl">

          {/* LOGO */}
          <Link to="/" className="font-poppins text-4xl font-bold text-neutral-500">
            <span className="text-neutral-600">TO DO</span> <span className="text-neutral-400">APP</span>
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
          <Route path="/add" element={<AddTodo />} />
          <Route path="/list" element={<ListTodos />} />
          <Route path="/open/:id" element={<OpenTodo />} />
          <Route path="/update/:id" element={<UpdateTodo />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;