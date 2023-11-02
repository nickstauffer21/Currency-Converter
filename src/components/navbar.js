import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Navbar() {
  return (
    <nav>
      <ul className="nav">
        <li className="nav-items house-icon">
          <Link to="/converter">
            <i className="fa-solid fa-house"></i>
          </Link>
        </li>
        <li className="nav-items">
          <Link to="/converter">Converter</Link>
        </li>
        <li className="nav-items">
          <Link to="/list">List</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
