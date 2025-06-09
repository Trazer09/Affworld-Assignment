import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

const Header = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const linkStyle = {
    margin: '0 10px',
    textDecoration: 'none',
    color: 'blue',
  };

  const activeLinkStyle = {
    ...linkStyle,
    fontWeight: 'bold',
    color: 'darkblue',
  };

  return (
    <header style={{ padding: '20px', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <nav>
        <NavLink
          to="/dashboard"
          style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/products"
          style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
        >
          Products
        </NavLink>
      </nav>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default Header; 