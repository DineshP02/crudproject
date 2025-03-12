import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Table({ users, handleDeleteUser }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.address.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <h3 className="d-flex justify-content-center text-dark" style={{ padding: '30px' }}>
        CRUD Application with React JS
      </h3>

      <div className="d-flex justify-content-between flex-wrap w-100">
        <input
          type="search"
          placeholder="Search by Name or City"
          className="form-control custom-search"
          style={{ maxWidth: '300px' }}
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Link to="/update/new">
          <button type="button" className="btn btn-success" style={{ maxWidth: '200px' }}>
            Add Details
          </button>
        </Link>
      </div>

      <div className="table">
        <table className="table table-bordered border-dark table-responsive">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>City</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user.customId}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.address.city}</td>
                <td>
                  <Link to={`/update/${user.customId}`}>
                    <button type="button" className="btn btn-primary">Edit</button>
                  </Link>
                </td>
                <td>
                  <button type="button" className="btn btn-danger" onClick={() => handleDeleteUser(user.customId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
