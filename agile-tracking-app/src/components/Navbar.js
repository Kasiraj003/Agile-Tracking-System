import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../Styles/Navbar.css"; // Ensure this path is correct

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/welcome");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-title">Agile Tracking System</span>
        <button className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </button>
      </div>
      <div ref={menuRef} className={`navbar-right ${isMenuOpen ? "open" : ""}`}>
        <Link to="/" className="navbar-link" onClick={closeMenu}>
          Home
        </Link>
        <Link
          to={user ? (user.role === "admin" ? "/admin-dashboard" : "/user-dashboard") : "/login"}
          className="navbar-link"
          onClick={closeMenu}
        >
          Dashboard
        </Link>
        <Link
          to={user ? (user.role === "admin" ? "/admin-profile" : "/user-profile") : "/login"}
          className="navbar-link"
          onClick={closeMenu}
        >
          Profile
        </Link>
        {user ? (
          <button onClick={() => {handleLogout(); closeMenu();}} className="navbar-button">
            Logout
          </button>
        ) : (
          <Link to="/login" className="navbar-link" onClick={closeMenu}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;