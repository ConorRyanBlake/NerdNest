import React from 'react'
import { NavLink } from 'react-router-dom'


const Sidebar = () => {
    return (
        <div>
            <div>
                <NavLink to="/add">
                <p>Add Items</p>
                </NavLink>
                <NavLink to="/List">
                <p>List Items</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar