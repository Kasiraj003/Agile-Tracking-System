// components/LoginPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../Styles/LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setError("Please include an '@' in the email");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      setError("Invalid email or password");
      return;
    }

    login(user);
    navigate(user.role === "admin" ? "/admin-dashboard" : "/user-dashboard");
  };

  return (
    <div className="login-container">
      <h2 className="login-title">🔑Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <p className="signup-prompt">
        Don't have an account?{" "}
        <button className="signup-button" onClick={() => navigate("/signup")}>
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default LoginPage;