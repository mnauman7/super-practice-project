import React, { useState } from 'react';
import Navbar from './Navbar';
import './ManageUsers.css';

const ManageUsers = ({ onLogout }) => {
  // Sample data based on your screenshot
  const [users] = useState([
    { name: 'Bob Johnson', address: '202 Oak Ave', city: 'Chicago', tel: '555-1202', admin: 'No' },
    { name: 'Charlie Brown', address: '303 Elm Rd', city: 'Snoopy Town', tel: '555-1203', admin: 'No' },
    { name: 'Diana Prince', address: '404 Themyscira Blvd', city: 'Washington', tel: '555-1204', admin: 'Yes' },
    { name: 'Ethan Hunt', address: '505 IMF Base', city: 'London', tel: '555-1205', admin: 'Yes' },
    { name: 'George Jetson', address: '707 Orbit City St', city: 'Orbit City', tel: '555-1207', admin: 'No' },
    { name: 'Hamza Bilal', address: '11 CC', city: 'Lahore', tel: '323232', admin: 'No' },
    { name: 'Alice Wonder', address: 'Jackson street', city: 'New york', tel: '555301', admin: 'No' },
  ]);

  return (
    <div className="manage-users-wrapper">
      <Navbar onLogout={onLogout} />
      
      <div className="content-container">
        <h2>Users</h2>
        
        <div className="search-section">
          <label>Search</label>
          <input type="text" className="search-input" />
          <button className="btn-dark">Find User</button>
        </div>

        <button className="btn-dark add-user-btn">Add User</button>

        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>City</th>
              <th>Telephone</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td className="user-link">{user.name}</td>
                <td>{user.address}</td>
                <td>{user.city}</td>
                <td>{user.tel}</td>
                <td>{user.admin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;