import React, { useState } from "react";
import API from "../api/axios.js";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/auth/login", { email, password });

      setMsg({ type: "success", text: res.data.message });

      // save user (demo)
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setTimeout(() => nav("/"), 700);
    } catch (err) {
      setMsg({
        type: "danger",
        text: err.response?.data?.message || "Invalid credentials",
      });
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-7 col-lg-5">

        {/* GLASS CARD */}
        <div
          className="card p-4 mt-5 border-0 shadow-lg rounded-4"
          style={{
            backdropFilter: "blur(10px)",
            background: "rgba(255,255,255,0.85)",
          }}
        >
          <h2 className="text-center fw-bold mb-3">Welcome Back 👋</h2>
          <p className="text-center text-muted mb-4">
            Login to access dashboard, profile & settings
          </p>

          {msg && (
            <div className={`alert alert-${msg.type} text-center`}>
              {msg.text}
            </div>
          )}

          <form onSubmit={submit}>
            {/* Email */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Email Address</label>
              <input
                type="email"
                className="form-control form-control-lg rounded-3"
                placeholder="yourname@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className="form-control form-control-lg rounded-3"
                placeholder="Enter password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Login Button */}
            <button className="btn btn-primary btn-lg w-100 rounded-3 mt-2">
              Login
            </button>

            {/* Forgot Password */}
            <div className="text-end mt-2">
              <Link to="/forgot-password" className="small fw-semibold">
                Forgot password?
              </Link>
            </div>

            {/* Divider */}
            <div className="text-center my-3 text-muted">OR</div>

            {/* Register Redirect */}
            <p className="text-center">
              Don’t have an account?{" "}
              <Link to="/register" className="fw-semibold">
                Create account
              </Link>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}
