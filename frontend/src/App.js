import React, { useState } from 'react';
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
        <Route path='/cart' element={<Cart />} />
      </Routes>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
