import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("http://localhost:4000/user/login", {
        email,
        password,
      });

      const token = data.data.token;
      const username = data.data.username;

      sessionStorage.setItem("token", token);
      onLogin(username);
      setSuccess("Login successful");
      setError("");
      setTimeout(() => {
        navigate("/");
      }, 3000)
    } catch (err) {
      setError("Invalid email or password");
      setSuccess("");
    }
  }
  return (
    <div className="login-container">
      <h2 className="header">Login</h2>
      <div className="signup-option">Don't have an account? <a href="/signup">Sign Up</a></div>
      <form onSubmit={handleSubmit} className="login-form">
          <input 
            type="text"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            />
          <input 
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required/>
          <button type="submit" className="login-btn">
            Login
          </button>
          {error && <p>{error}</p>}
          {success && <p>{success}</p>}
      </form>

    </div>
  )
}

export default Login;
