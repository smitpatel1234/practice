import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import React from 'react';
import Users from './Users';
import Task from './Task';
import './App.css'; // Import the CSS file

function App() {
  return (
    <div className="App">
      <Router>
        <nav className="nav">
          <Link className="nav-link" to="/users">Users</Link>
          <Link className="nav-link" to="/task">Tasks</Link>
        </nav>
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/task" element={<Task />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
