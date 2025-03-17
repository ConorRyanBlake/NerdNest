import React from 'react'
import "./Navbar.css"
import NerdNest from "../../assets/nerd_nest-icon.png";

const Navbar = ({ setToken }) => {
    return (
        <div className='navbar'>
            <img src={NerdNest} alt='nerdnest-icon' />
            <h1>NerdNest</h1>
            <button onClick={() => setToken("")}>Logout</button>
        </div>
    )
}

export default Navbar