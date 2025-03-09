import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext"; // Import useAuth
import Navbar from "./components/Navbar"; // Import the Navbar
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import SuperheroesList from "./components/SuperheroesList";
import FavoritesPage from "./pages/FavoritesPage";
import "./App.css";

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Use the user state
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      {" "}
      {/* Wrap the entire app with AuthProvider */}
      <Router>
        <Navbar /> {/* Add the Navbar here */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/superheroes" element={<SuperheroesList />} />

          {/* Protected Routes */}
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <FavoritesPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
