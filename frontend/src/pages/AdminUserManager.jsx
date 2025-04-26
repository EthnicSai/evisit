import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminUserManager = () => {
  const [users, setUsers] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/users`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };
    fetchUsers();
  }, [API_URL]);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${API_URL}/api/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  return (
    <div className="admin-user-manager">
      <h2>User Management</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <p>{user.username} ({user.email})</p>
            <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUserManager;
