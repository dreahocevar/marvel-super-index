import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./LandingPage.css";

const LandingPage = () => {
  const { user } = useAuth();

  return (
    <div className="landing-container">
      <h1 className="bangers-regular">Super Index</h1>
      <h2>
        Find your Marvel heroes! Create lists and assemble your favourite ones.
      </h2>
      {!user ? (
        <div className="landing-buttons">
          <Link to="/superheroes" className="btn search-btn">
            Search
          </Link>
          <Link to="/signup" className="btn signup-btn">
            Sign Up
          </Link>
        </div>
      ) : (
        <div className="landing-buttons">
          <Link to="/superheroes" className="btn search-btn">
            Search
          </Link>
          <Link to="/favorites" className="btn favorites-btn">
            Favorites
          </Link>
        </div>
      )}
      {!user && (
        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      )}
    </div>
  );
};

export default LandingPage;
