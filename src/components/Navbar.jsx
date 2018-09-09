import React from 'react';
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='navbar'>
      <Link to='/'><h1>News</h1></Link>
      <div className='nav-buttons'>
        <button className='login'>Log In</button>
        <button className='signup'>Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;