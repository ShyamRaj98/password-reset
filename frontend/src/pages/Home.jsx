import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const [user, setUser] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (!saved) return nav("/login"); // protect route
    setUser(JSON.parse(saved));
  }, []);

  if (!user) return null;

  return (
    <div className="container py-5">

      {/* CARD */}
      <div
        className="card shadow-lg border-0 rounded-4 p-4 mx-auto"
        style={{
          maxWidth: "650px",
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h2 className="text-center fw-bold mb-3">Hello, {user.name} 👋</h2>

        <p className="text-center text-muted mb-4">
          You are successfully logged in.  
          This is your protected Home Dashboard.
        </p>

        <div className="row text-center mb-4">
          <div className="col">
            <div className="p-3 rounded bg-light shadow-sm">
              <h5 className="fw-bold mb-1">Name</h5>
              <p className="text-muted mb-0">{user.name}</p>
            </div>
          </div>
          <div className="col">
            <div className="p-3 rounded bg-light shadow-sm">
              <h5 className="fw-bold mb-1">Email</h5>
              <p className="text-muted mb-0">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            className="btn btn-danger btn-lg w-100 rounded-3"
            onClick={() => {
              localStorage.removeItem("user");
              nav("/login");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
