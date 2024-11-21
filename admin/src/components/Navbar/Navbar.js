import React from 'react'

const Navbar = ({ setToken }) => {
    return (
        <div>
            <h1>navbar</h1>
            <button onClick={() => setToken("")}>Logout</button>
        </div>
    )
}

export default Navbar