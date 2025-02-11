import React from 'react'
import "./Navbar.css"

const Navbar = ({ setToken }) => {
    return (
        <div className='navbar'>
            <h1>NerdNest</h1>
            <button onClick={() => setToken("")}>Logout</button>
        </div>
    )
}

export default Navbar