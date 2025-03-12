import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Table from './Table';
import axios from 'axios';
import Update from './Update';

export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setUsers(response.data.map(user => ({
          ...user, 
          customId: user.id // Assigning a separate ID for uniqueness
        })));
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Add new user
  const handleAddUser = (newUser) => {
    const uniqueId = users.length > 0 ? Math.max(...users.map(u => u.customId)) + 1 : 1;
    setUsers([...users, { ...newUser, customId: uniqueId }]);
  };

  // Update existing user
  const handleUpdateUser = (updatedUser) => {
    setUsers(users.map(user => 
      user.customId === updatedUser.customId ? updatedUser : user
    ));
  };

  // Delete a user
  const handleDeleteUser = (customId) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      setUsers(users.filter(user => user.customId !== customId));
      alert("User deleted successfully!");
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={<Table users={users} handleDeleteUser={handleDeleteUser} />} 
        />
        <Route 
          path="/update/:id" 
          element={<Update users={users} handleUpdateUser={handleUpdateUser} handleAddUser={handleAddUser} />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
