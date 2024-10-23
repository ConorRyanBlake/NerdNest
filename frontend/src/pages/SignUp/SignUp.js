import React, { useState } from "react";
import "./SignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [emailConfirmation, setEmailConfirmation] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email !== emailConfirmation) {
      setError("Email and Email Confirmation do not match");
      setSuccess("");
      return;
    }

    if (password !== passwordConfirmation) {
      setError("Password and Password Confirmation do not match");
      setSuccess("");
      return;
    }

    try {
      await axios.post("http://localhost:4000/user/register", {
        name,
        email,
        password,
      });
      setSuccess("Registration successful");
      setError("");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError("Registration failed");
      setSuccess("");
    }
  }

  return (
    <div className="login-container">
      <h2 className="header">Sign Up</h2>
      <div className="signup-option">
        Already have an account? <a href="/login">Login</a>
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="text"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="text"
          className="form-control"
          value={emailConfirmation}
          onChange={(e) => setEmailConfirmation(e.target.value)}
          placeholder="Email Confirmation"
          required
        />
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input
          type="password"
          className="form-control"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          placeholder="Password Confirmation"
          required
        />
        <button type="submit" className="login-btn">
          Login
        </button>
        {error && <p>{error}</p>}
          {success && <p>{success}</p>}
      </form>
    </div>
  );
}

export default SignUp;
