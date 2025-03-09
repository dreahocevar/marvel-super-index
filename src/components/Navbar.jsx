import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img
            src={require("../images/logo.png")}
            alt="Logo"
            className="navbar-logo"
          />
        </Link>
      </div>
      <div className="navbar-right">
        {user ? ( //logged
          <>
            <Link to="/superheroes" className="navbar-button favorites-button">
              Search
            </Link>
            <Link to="/favorites" className="navbar-button favorites-button">
              Favorites
            </Link>
            <button className="navbar-button logout-button" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          // not logged
          <>
            <Link to="/signup" className="navbar-button signup-button">
              Sign Up
            </Link>
            <Link to="/login" className="navbar-button login-button">
              Log In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
