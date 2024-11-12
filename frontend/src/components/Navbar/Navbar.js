import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaUserCircle,
  FaCartArrowDown,
  FaBars,
} from "react-icons/fa";
import "./Navbar.css";

const NavbarMain = ({ user, onLogout, itemCount }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setSearchVisible((prev) => !prev);
  };

  return (
    <header className="navbar navbar-expand-lg bg-light">
      <nav className="container">
        <div className="navbar-brand">
          <Link className="nav-link" to="/">
            <h1>NerdNest</h1>
          </Link>
        </div>
        <button className="navbar-toggler" type="button">
          <FaBars onClick={toggleSidebar} />
        </button>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><a href="/">Home</a></li>
            <li className="nav-item"><a href="/products">Products</a></li>
          </ul>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <div className="nav-search">
                {searchVisible ? (
                  <>
                    <input
                      type="text"
                      placeholder="Search..."
                      onBlur={() => setSearchVisible(false)}
                      className="form-control"
                    />
                    <button className="btn btn-outline-secondary search-icon">
                      <FaSearch />
                    </button>
                  </>
                ) : (
                  <button
                    className="btn btn-outline-secondary search-icon"
                    onClick={toggleSearch}
                  >
                    <FaSearch />
                  </button>
                )}
              </div>
            </li>
            <li className="nav-item cart-icon-container">
              <Link className="nav-link" to="/cart">
                <FaCartArrowDown />
                {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
              </Link>
            </li>
            <li className="nav-item">
              <div className="profile-section">
                <FaUserCircle className="profile-icon" onClick={toggleMenu} />
                {isMenuOpen && (
                  <div className="menu">
                    {user ? (
                      <>
                        <a href="/profile" className="menu-item">
                          My Profile: {user.username}
                        </a>
                        <a href="/orders" className="menu-item">
                          Orders
                        </a>
                        <button onClick={onLogout} className="menu-item">
                          LogOut
                        </button>
                      </>
                    ) : (
                      <a href="/login" className="menu-item">
                        Login
                      </a>
                    )}
                  </div>
                )}
              </div>
            </li>
          </ul>
        </div>
        {/* Sidebar */}
        {sidebarVisible && (
          <div className={`sidebar ${sidebarVisible ? "show" : ""}`}>
            <div className="sidebar-overlay" onClick={toggleSidebar}></div>
            <div className="sidebar-content">
              <ul>
                <li>
                  <Link to="/" onClick={toggleSidebar}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/products" onClick={toggleSidebar}>
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/cart" onClick={toggleSidebar}>
                    Cart
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default NavbarMain;
