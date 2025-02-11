import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Sidebar.css"

const Sidebar = () => {
    return (
        <div>
            <div className='sidebar'>
                <NavLink to="/add" activeClassName="active">
                <p>Add Items</p>
                </NavLink>
                <NavLink to="/List" activeClassName="active">
                <p>List Items</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar