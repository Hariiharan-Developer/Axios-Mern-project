import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-2">
      <div className="container-fluid">

        {/* Brand */}
        <Link className="navbar-brand fw-bold fs-4" to="/">
          <span style={{ color: "yellowgreen" }}>University</span> Main-Gate
        </Link>

        {/* Toggler Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">

            <li className="nav-item mx-1">
              <Link className="nav-link" to="/">
                <button className="btn btn-sm text-dark" style={{ background: "yellowgreen", fontWeight:'600' }}>
                  Home
                </button>
              </Link>
            </li>

            <li className="nav-item mx-1">
              <Link className="nav-link" to="/record">
                <button className="btn btn-sm text-dark" style={{ background: "yellowgreen", fontWeight:'600' }}>
                  Track Visitor
                </button>
              </Link>
            </li>

            <li className="nav-item mx-1">
              <Link className="nav-link" to="/inpass">
                <button className="btn btn-sm text-dark" style={{ background: "yellowgreen", fontWeight:'600' }}>
                  In-Pass
                </button>
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
