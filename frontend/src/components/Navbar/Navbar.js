import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaCartArrowDown, FaBars, FaTimes } from "react-icons/fa";
import NerdNest from "../../assets/nerd_nest-icon.png";
import "./Navbar.css";

const NavbarMain = ({ user, onLogout, itemCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const menuRef = useRef(null);

  // Toggle profile dropdown menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
      
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu on window resize (if screen becomes larger)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="navbar" ref={navRef}>
      <nav className="navbar-container">
        {/* Logo */}
        <div className="navbar-brand">
          <Link to="/">
            <img src={NerdNest} alt="NerdNest" />
            <h1>NerdNest</h1>
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-overlay ${isMobileMenuOpen ? "active" : ""}`} onClick={toggleMobileMenu}></div>

        {/* Navigation Links */}
        <ul className={`nav ${isMobileMenuOpen ? "active" : ""}`}>
        <li className="nav-item">
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
          </li>
          <li className="nav-item">
            <Link to="/products" onClick={() => setIsMobileMenuOpen(false)}>Products</Link>
          </li>

          {/* Cart Icon */}
          <li className="nav-item cart-icon-container">
            <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)}>
              <FaCartArrowDown />
              {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
            </Link>
          </li>

          {/* Profile Section */}
          <li className="nav-item">
            <div className="profile-section" ref={menuRef}>
              <FaUserCircle className="profile-icon" onClick={toggleMenu} />

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="menu">
                  {user ? (
                    <>
                      <Link to="/orders" className="menu-item" onClick={() => {setIsMenuOpen(false); setIsMobileMenuOpen(false);}}>
                        Orders
                      </Link>
                      <button 
                        onClick={() => {
                          onLogout();
                          setIsMenuOpen(false);
                          setIsMobileMenuOpen(false);
                        }} 
                        className="menu-item"
                      >
                        Log Out
                      </button>
                    </>
                  ) : (
                    <Link to="/login" className="menu-item" onClick={() => {setIsMenuOpen(false); setIsMobileMenuOpen(false);}}>
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