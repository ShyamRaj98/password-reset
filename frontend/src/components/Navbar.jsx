import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const nav = useNavigate();
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const logout = () => {
    localStorage.removeItem("user");
    nav("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light shadow-sm"
      style={{
        backdropFilter: "blur(10px)",
        background: "rgba(255,255,255,0.8)",
      }}
    >
      <div className="container">
        {/* BRAND */}
        <Link to="/" className="navbar-brand fw-bold fs-4">
          🔐 PasswordReset
        </Link>

        {/* MOBILE TOGGLE */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAV MENUS */}
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto">

            {/* If NOT logged in */}
            {!user && (
              <>
                <li className="nav-item">
                  <Link to="/login" className="btn btn-primary me-2 px-4">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/register"
                    className="btn btn-outline-primary px-4"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}

            {/* If logged in */}
            {user && (
              <>
                <li className="nav-item d-flex align-items-center me-3">
                  <span className="fw-bold text-dark">
                    {user.name}
                  </span>
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-danger px-4"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}
