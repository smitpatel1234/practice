import React, { useState, useEffect } from 'react';
import './Task.css'; // Import the CSS file

export default function Task() {
  const [users, setUsers] = useState([]);
  const [task, setTask] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    const storedUsers = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      storedUsers.push(JSON.parse(localStorage.getItem(key)));
    }
    setUsers(storedUsers);
  }, []);

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const addTask = () => {
    if (!selectedUser || !task) return;
    const userData = JSON.parse(localStorage.getItem(selectedUser));
    userData.tasks.push(task);
    localStorage.setItem(selectedUser, JSON.stringify(userData));
    setUsers(prevUsers => prevUsers.map(u => u.username === selectedUser ? { ...u, tasks: userData.tasks } : u));
    setTask("");
  };

  return (
    <div className="tasks-container">
      <h2>Tasks</h2>
      {users.length === 0 ? (
        <p>No tasks</p>
      ) : (
        users.map((user, index) => (
          <div key={index} className="user-tasks">
            <h3>{user.username} - {user.job}</h3>
            <ul>
              {user.tasks.length === 0 ? (
                <li>No tasks</li>
              ) : (
                user.tasks.map((task, i) => <li key={i}>{task}</li>)
              )}
            </ul>
          </div>
        ))
      )}
      <div className="add-task">
        <h3>Add Task</h3>
        <select value={selectedUser} onChange={handleUserChange}>
          <option value="">Select User</option>
          {users.map((user, index) => (
            <option key={index} value={user.username}>{user.username}</option>
          ))}
        </select>
        <input type="text" value={task} onChange={handleTaskChange} placeholder="Enter task" />
        <button onClick={addTask}>Add Task</button>
      </div>
    </div>
  );
}
