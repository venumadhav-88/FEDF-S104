import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header" role="banner">
      <div className="header-left">
        <img src="/Images/kllogo.png" alt="KL Logo" className="logo" />
        <div>
          <div className="header-title">Product Management System</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.9)' }}>Koneru Lakshmaiah Education Foundation</div>
        </div>
      </div>

      <nav className="navbar" role="navigation" aria-label="Main">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/aboutus">About</Link>
        <Link className="nav-link" to="/signin">Sign In</Link>
        <Link className="nav-link" to="/signup">Sign Up</Link>
      </nav>
    </header>
  );
};

export default Header;
