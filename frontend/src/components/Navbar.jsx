import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">PasswordResetDemo</Link>
        <div>
          <Link to="/register" className="btn btn-outline-primary me-2">Register</Link>
          <Link to="/login" className="btn btn-primary">Login</Link>
        </div>
      </div>
    </nav>
  );
}
