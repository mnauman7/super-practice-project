import React, { useEffect, useState } from 'react';
import './UserTable.css';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token'); 
    
        fetch('http://localhost:5050/api/users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.status === 403 || response.status === 401) {
                throw new Error("Security denied access. Check your token!");
            }
            return response.json();
        })
        .then(data => {
            console.log("Backend Data:", data); // Check your F12 Console to see the keys!
            setUsers(data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error:', error);
            setLoading(false);
        });
    }, []);

    if (loading) return <div className="loader">Loading Users...</div>;

    return (
        <div className="admin-container">
            <h2 className="title">Manage Users</h2>
            
            <div className="table-controls">
                <button className="add-btn">+ Add New User</button>
            </div>

            <table className="user-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Telephone</th>
                        <th>Admin Access</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id}>
                            {/* Combine firstName and lastName */}
                            <td className="name-cell">
                                {user.firstName} {user.lastName}
                            </td>
                            
                            <td>{user.address}</td>
                            <td>{user.city}</td>
                            <td>{user.telephone}</td>
                            <td>
                                <span className={`status ${user.admin === 'Yes' || user.admin === true || user.isAdmin === true ? 'is-admin' : ''}`}>
                                    {user.admin === 'Yes' || user.admin === true || user.isAdmin === true ? 'Yes' : 'No'}
                                </span>
                            </td>
                        </tr>
                        ))
                    ) : (
                        <tr><td colSpan="5">No users found.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;