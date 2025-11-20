import React, { useState } from "react";
import API from "../api/axios.js";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState(null);

  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/auth/register", form);
      setMsg({ type: "success", text: res.data.message });
      setTimeout(() => nav("/login"), 700);
    } catch (err) {
      setMsg({
        type: "danger",
        text: err.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-7 col-lg-6">

        <div className="card shadow-lg p-4 mt-4 border-0 rounded-4">
          <h2 className="text-center mb-3 fw-bold">Create Account</h2>
          <p className="text-center text-muted mb-4">
            Register to access dashboard, profile & password reset system
          </p>

          {msg && (
            <div className={`alert alert-${msg.type} text-center`}>
              {msg.text}
            </div>
          )}

          <form onSubmit={submit}>
            {/* Name */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Full Name</label>
              <input
                type="text"
                name="name"
                required
                className="form-control form-control-lg rounded-3"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handle}
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Email Address</label>
              <input
                type="email"
                name="email"
                required
                className="form-control form-control-lg rounded-3"
                placeholder="yourname@example.com"
                value={form.email}
                onChange={handle}
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                name="password"
                required
                className="form-control form-control-lg rounded-3"
                placeholder="Enter password"
                value={form.password}
                onChange={handle}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg w-100 rounded-3 mt-2"
            >
              Create Account
            </button>

            <p className="text-center mt-3">
              Already have an account?{" "}
              <Link to="/login" className="fw-semibold">
                Login
              </Link>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}
