import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem("auth_token");
    const savedEmail = localStorage.getItem("user_email");
    if (savedToken && savedEmail) {
      setIsAuthenticated(true);
      setToken(savedToken);
      setUserEmail(savedEmail);
    }
  }, []);

  const handleLoginSuccess = (authToken, email) => {
    setToken(authToken);
    setUserEmail(email);
    setIsAuthenticated(true);
    navigate("/dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_email");
    setIsAuthenticated(false);
    setToken("");
    setUserEmail("");
    navigate("/login");
  };

  const handleSwitchToSignup = () => {
    navigate("/signup");
  };

  const handleSwitchToLogin = () => {
    navigate("/login");
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" />
          ) : (
            <Login
              onSwitchToSignup={handleSwitchToSignup}
              onLoginSuccess={handleLoginSuccess}
            />
          )
        }
      />
      <Route
        path="/signup"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" />
          ) : (
            <Signup onSwitchToLogin={handleSwitchToLogin} />
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <Dashboard
              userEmail={userEmail}
              token={token}
              onLogout={handleLogout}
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}
