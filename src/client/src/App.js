import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddTodo from './components/AddTodo';
import ListTodos from './components/ListTodos';
import OpenTodo from './components/OpenTodo';
import UpdateTodo from './components/UpdateTodo';
import './styles/style.css';

function App() {
  return (
    <Router>
      <div style={{ padding: '2rem' }}>
        <h1>To-Do App</h1>
        <nav style={{ marginBottom: '1rem' }}>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            <li><Link to="/add">Add Todo</Link></li>
            <li><Link to="/list">List Todos</Link></li>
            <li><Link to="/open/1">Open Todo (id:1)</Link></li>
            <li><Link to="/update/1">Update Todo (id:1)</Link></li>
          </ul>
        </nav>

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