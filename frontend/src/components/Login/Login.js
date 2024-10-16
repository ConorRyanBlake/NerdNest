// src/components/Login/Login.js
import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  //Function to handle LogIn
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/users/login", {
        username,
        password,
      });
      const token = response.data.token;
      sessionStorage.setItem("token", token);
      onLogin(username);
      setSuccess(`Welcome ${username}`);
      setError("");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      setError("Invalid username or password");
      setSuccess("");
    }
  };

  return (
    <div className="login-container bg-dark text-white p-4 rounded">
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" className="btn btn-warning w-100">
          Login
        </button>
      </form>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
    </div>
  );
}

export default Login;
