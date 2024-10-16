import React, { useState } from 'react';
import './App.css';
import NavbarMain from "./components/Navbar/Navbar";
import HomePage from './pages/HomePage';
import Login from './components/Login/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [username, setUsername] = useState("");

  const handleLogin = (username) => {
    setUsername(username);
  };
  return (
    <Router>
    <div className="App">
      <NavbarMain username={username} />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login onLogin={handleLogin}/>} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
