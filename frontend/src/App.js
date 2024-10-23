import React, { useState } from 'react';
import './App.css';
import NavbarMain from "./components/Navbar/Navbar";
import Home from './pages/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Collection from './pages/Collection/Collection';
import Product from './pages/Product/Product';
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
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login onLogin={handleLogin}/>} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/products' element={<Collection />} />
        <Route path='/product/:productId' element={<Product />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
