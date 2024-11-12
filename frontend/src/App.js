import React, { useEffect, useState } from 'react';
import './App.css';
import NavbarMain from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from './pages/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Collection from './pages/Collection/Collection';
import Product from './pages/Product/Product';
import Cart from './pages/Cart/Cart';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = jwtDecode(token);
      console.log("Decoded user:", decodedUser);
      setUser(decodedUser);
    }
  }, []);

  const handleLogin = (token) => {
    // Save token and set user when logging in
    localStorage.setItem("token", token);
    const decodedUser = jwtDecode(token);
    setUser(decodedUser);
  };

  const handleLogout = () => {
     // Clear token and reset user state when logging out
    localStorage.removeItem("token");
    setUser(null);
  }
  return (
    <Router>
    <div className="App">
      <NavbarMain user={user} onLogout={handleLogout} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login onLogin={handleLogin}/>} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/products' element={<Collection />} />
        <Route path='/product/:productId' element={<Product user={user?.id} />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
