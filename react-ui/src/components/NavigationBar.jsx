import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 1. Added useNavigate
import { useAuth } from '../context/AuthContext';    // 2. Added useAuth
import './NavigationBar.css';

const NavigationBar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const { logout } = useAuth(); // 3. Get logout function
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the "Wallet"
        logout();                         // Update Auth State
        navigate('/login');               // Redirect
    };

    return (
        <nav className="navbar">
            <div className="nav-item">
                <Link to="/home" className="nav-link">
                    <i className="fa fa-home"></i> HOME
                </Link>
            </div>
            
            <div 
                className={`nav-item admin-item ${showDropdown ? 'active' : ''}`}
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
            >
                <div className="nav-link">
                    <i className="fa fa-list"></i> ADMIN <i className="fa fa-caret-down"></i>
                </div>

                {showDropdown && (
                    <div className="dropdown-menu">
                        <Link to="/admin" className="dropdown-item">
                            <i className="fa fa-user"></i> MANAGE USERS
                        </Link>
                    </div>
                )}
            </div>

            {/* 4. This filler pushes the button to the right */}
            <div className="nav-filler"></div>

            <div className="nav-item">
                <button className="logout-nav-btn" onClick={handleLogout}>
                    <i className="fa fa-sign-out"></i> LOGOUT
                </button>
            </div>
        </nav>
    );
};

export default NavigationBar;