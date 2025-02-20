import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaCartArrowDown } from "react-icons/fa";
import "./Navbar.css";

const NavbarMain = ({ user, onLogout, itemCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle dropdown menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="navbar">
      <nav className="navbar-container">
        {/* Logo */}
        <div className="navbar-brand">
          <Link to="/">
            <h1>NerdNest</h1>
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="nav">
          <li className="nav-item">
            <Link to="/products">Products</Link>
          </li>

          {/* Cart Icon */}
          <li className="nav-item cart-icon-container">
            <Link to="/cart">
              <FaCartArrowDown />
              {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
            </Link>
          </li>

          {/* Profile Section */}
          <li className="nav-item">
            <div className="profile-section">
              <FaUserCircle className="profile-icon" onClick={toggleMenu} />

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="menu">
                  {user ? (
                    <>
                      <Link to="/profile" className="menu-item">
                        My Profile: {user.username}
                      </Link>
                      <Link to="/orders" className="menu-item">
                        Orders
                      </Link>
                      <button onClick={onLogout} className="menu-item">
                        Log Out
                      </button>
                    </>
                  ) : (
                    <Link to="/login" className="menu-item">
                      Login
                    </Link>
                  )}
                </div>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavbarMain;
