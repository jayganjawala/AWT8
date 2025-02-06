// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ title: '', description: '', status: 'pending' });
  const [message, setMessage] = useState('');

  // Fetch Tasks from Backend
  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then(response => setTasks(response.data))
      .catch(err => setMessage('Error fetching tasks'));
  }, []);

  // Handle task creation
  const handleAddTask = () => {
    axios.post('http://localhost:5000/tasks', task)
      .then(response => {
        setTasks([...tasks, response.data]);
        setMessage('Task added successfully!');
      })
      .catch(err => setMessage('Error adding task'));
  };

  // Handle task update
  const handleUpdateTask = (id) => {
    axios.put(`http://localhost:5000/tasks/${id}`, task)
      .then(response => {
        const updatedTasks = tasks.map(t =>
          t._id === id ? response.data : t
        );
        setTasks(updatedTasks);
        setMessage('Task updated successfully!');
      })
      .catch(err => setMessage('Error updating task'));
  };

  // Handle task deletion
  const handleDeleteTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then(() => {
        const updatedTasks = tasks.filter(t => t._id !== id);
        setTasks(updatedTasks);
        setMessage('Task deleted successfully!');
      })
      .catch(err => setMessage('Error deleting task'));
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      {message && <div>{message}</div>}
      <input
        type="text"
        value={task.title}
        onChange={e => setTask({ ...task, title: e.target.value })}
        placeholder="Task Title"
      />
      <input
        type="text"
        value={task.description}
        onChange={e => setTask({ ...task, description: e.target.value })}
        placeholder="Task Description"
      />
      <button onClick={handleAddTask}>Add Task</button>

      <ul>
        {tasks.map(t => (
          <li key={t._id}>
            <h3>{t.title}</h3>
            <p>{t.description}</p>
            <span>{t.status}</span>
            <button onClick={() => handleUpdateTask(t._id)}>Update</button>
            <button onClick={() => handleDeleteTask(t._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
