import React from "react";
import { Link } from "react-router-dom"

const MenuBar = (props) => {
    return (
        <div className="menu-bar">
            <Link to="/" className="menu-bar-link">Home</Link>
            <Link to="/coins" className="menu-bar-link">Coins</Link>
            <Link to="/news" className="menu-bar-link">News</Link>
        </div>
    )
}

export default MenuBar