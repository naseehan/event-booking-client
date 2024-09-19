import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/navbar/ticket-logo.png";
import "../stylePages/navbar/App.css";

const Navbar = () => {
  const [token, setToken] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("userstokentoken");
    setToken(storedToken);
  }, []);

  const handleClick = (e) => {
    e.preventDefault();

    // Use the window.confirm() method to show a confirmation dialog
    const confirmed = window.confirm("Are you sure you want to log out?");

    if (confirmed) {
      localStorage.removeItem("userstokentoken");
      localStorage.removeItem("email");
      localStorage.removeItem("userId");
      setToken(null);
      navigate("/login");
    } else {
    }
  };

  const handleUser = (e) => {
    e.preventDefault();

    if (token) {
      navigate("/user");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {/* <a className="navbar-brand" href="#">Navbar</a> */}
      {/* <div className="logo"> */}
      <Link to="/">
        <img src={logo} alt="logo" className="navbar-brand " loading="lazy"/>
      </Link>
      {/* </div> */}

      <button
        className="navbar-toggler menu__icon"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse div-own-styles"
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav  navbar-own-styles">
          <li className="nav-item active">
            {/* <a className="nav-link" >Home <span className="sr-only">(current)</span></a> */}
            <Link
              to="/"
              className="nav-link"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
            >
              Home
            </Link>
          </li>
          <li className="nav-item active">
            <Link
              to="/events"
              className="nav-link"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
            >
              Events
            </Link>
          </li>
          <li className="nav-item active">
            <Link
              to="/contact"
              className="nav-link"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
            >
              Contact US
            </Link>
          </li>
          <li className="nav-item active">
            <Link
              to="/user"
              onClick={handleUser}
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
            >
              <i className="fa-solid fa-user"></i>
            </Link>
          </li>
          {token ? (
            <li className="nav-item active">
              <Link
                to="/cart2"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
              >
                <i className="fa-solid fa-cart-shopping"></i>
              </Link>
            </li>
          ) : null}

          {!token ? (
            <li className="nav-item active">
              <Link to="/signup" className="nav-link">
                Sign up
              </Link>
            </li>
          ) : (
            <li className="nav-item active">
              <Link to="/login" onClick={handleClick} className="nav-link">
                {/* logout button */}
                <button className="Btn">
                  <div className="sign">
                    <svg viewBox="0 0 512 512">
                      <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                    </svg>
                  </div>

                  <div className="text">Logout</div>
                </button>
              </Link>
            </li>
          )}
          {/* <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li> */}
          {/* <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Dropdown
          </a> */}
          {/* <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <a className="dropdown-item" href="#">Action</a>
            <a className="dropdown-item" href="#">Another action</a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="#">Something else here</a>
          </div> */}
          {/* </li> */}
          {/* <li className="nav-item">
          <a className="nav-link disabled" href="#">Disabled</a>
        </li> */}
        </ul>
        {/* <form className="form-inline my-2 my-lg-0">
        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form> */}
      </div>
    </nav>
  );
};

export default Navbar;
