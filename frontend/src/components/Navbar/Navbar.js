import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Import search icon
import "./Navbar.css";

const NavbarMain = ({ username }) => {
  const [searchVisible, setSearchVisible] = useState(false);

  const toggleSearch = () => {
    setSearchVisible((prev) => !prev);
  };

  return (
    <header className="navbar">
      <nav className="container">
        <div className="nav-brand">
          <Link className="nav-link" to="/">
            <h1>NerdNest</h1>
          </Link>
        </div>
        <div className="nav-menu">
          <ul className="nav">
            <li className="nav-item">
              <div className="nav-search">
                {searchVisible ? (
                  <>
                    <input
                      type="text"
                      placeholder="Search..."
                      onBlur={() => setSearchVisible(false)}
                    />
                    <button className="search-icon">
                      <FaSearch />
                    </button>
                  </>
                ) : (
                  <button className="search-icon" onClick={toggleSearch}>
                    <FaSearch />
                  </button>
                )}
              </div>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/favorite">
                Favorite
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Cart
              </Link>
            </li>
            {username ? (
              <li className="nav-item">
                <span className="nav-link">Welcome, {username}</span>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavbarMain;
