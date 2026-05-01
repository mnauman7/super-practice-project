import React, { useState } from 'react';
import { Home, List, ChevronDown, User, LogOut } from 'lucide-react';
/* 1. Import Link from react-router-dom */
import { Link } from 'react-router-dom'; 
import './Navbar.css';

const Navbar = ({ onLogout }) => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <nav className="main-navbar">
      <div className="top-stripe"></div>
      
      <div className="nav-group-left">
        {/* 2. Wrap HOME in a Link to go back to /home */}
        <Link to="/home" className="nav-item" style={{ textDecoration: 'none' }}>
          <Home className="nav-icon" />
          <span className="nav-text">HOME</span>
        </Link>

        <div 
          className={`nav-item dropdown-trigger ${isAdminOpen ? 'dropdown-active' : ''}`}
          onClick={() => setIsAdminOpen(!isAdminOpen)}
        >
          <List className="nav-icon" />
          <span className="nav-text">ADMIN</span>
          <ChevronDown className="nav-arrow" />

          {isAdminOpen && (
            <div className="dropdown-menu">
              {/* 3. Wrap MANAGE USERS in a Link to go to /manage-users */}
              <Link to="/manage-users" className="dropdown-item" style={{ textDecoration: 'none' }}>
                <User className="dropdown-icon" />
                <span className="dropdown-text">MANAGE USERS</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="nav-group-right">
        <div className="nav-item logout-button" onClick={onLogout}>
          <LogOut className="nav-icon" />
          <span className="nav-text">LOGOUT</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;