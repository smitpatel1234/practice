import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Users.css'; // Import the CSS file

export default function Users() {
  const [user, setUser] = useState({
    username: "",
    job: ""
  });
  const [users, setUsers] = useState([]);

  const handleChange = (e) => { 
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const addUser = () => {
    if (!user.username || !user.job) return; // Add basic validation
    localStorage.setItem(user.username, JSON.stringify({ ...user, tasks: [] }));
    setUsers([...users, { ...user, tasks: [] }]);
    setUser({ username: "", job: "" });
  };

  const removeUser = (username) => {
    localStorage.removeItem(username);
    setUsers(users.filter(u => u.username !== username));
  };

  useEffect(() => {
    const storedUsers = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      storedUsers.push(JSON.parse(localStorage.getItem(key)));
    }
    setUsers(storedUsers);
  }, []);

  return (
    <>
      <div className="users-container">
        <h2>Users</h2>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" value={user.username} onChange={handleChange} />
        <label htmlFor="job">Job</label>
        <input type="text" id="job" name="job" value={user.job} onChange={handleChange} />
        <button onClick={addUser}>Add User</button>
      </div>

      <div className="users-list">
        <h2>List of Users</h2>
        <ul>
          {users.map((u, index) => (
            <li key={index} className="user-item">
              {u.username} - {u.job}
              <button onClick={() => removeUser(u.username)}>Remove</button>
              <Link to="/task">View Tasks</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
