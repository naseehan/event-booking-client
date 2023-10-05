// import React, { useState } from "react";
import logo from "../assets/navbar/logo-dark.svg";
import "../stylePages/navbar/App.css";
import { Link } from "react-router-dom";

const Navbar = () => {


  return (
    <div className="container">
      <div className="desk-navbar">
        <nav>
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>
          <ul>
            <li>
              <Link to="/" >Home</Link>
            </li>
            <li>
              <Link to="/events" >Events</Link>
            </li>
            <li>
              <Link to="/contact" >Contact US</Link>
            </li>
            <li>
              <Link to="/signup" >Sign Up</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
