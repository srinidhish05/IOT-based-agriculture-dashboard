// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          AgriDashboard
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <span className={click ? 'menu-x' : 'menu-bars'}>
            {click ? '✕' : '☰'}
          </span>
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/login' className='nav-links' onClick={closeMobileMenu}>
              Login
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/signup' className='nav-links' onClick={closeMobileMenu}>
              Signup
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/feedback' className='nav-links' onClick={closeMobileMenu}>
              Feedback
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;