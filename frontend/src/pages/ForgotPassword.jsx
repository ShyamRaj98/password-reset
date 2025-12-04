import React, { useState } from "react";
import API from "../api/axios.js";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    try {
      const res = await API.post("/api/auth/forgot-password", { email });
      setMsg({ type: "success", text: res.data.message });
      setEmail("");
    } catch (err) {
      setMsg({
        type: "danger",
        text: err.response?.data?.message || "Something went wrong!"
      });
    }

    setLoading(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card shadow-lg p-4" style={{ width: "420px", borderRadius: "16px" }}>
        <h3 className="text-center mb-3 fw-bold">Forgot Password</h3>

        <p className="text-muted text-center">
          Enter your registered email to receive a password reset link.
        </p>

        {msg && (
          <div className={`alert alert-${msg.type} text-center fw-semibold`}>
            {msg.text}
          </div>
        )}

        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="example@gmail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ borderRadius: "10px" }}
            />
          </div>

          <button
            className="btn btn-primary w-100 py-2 fw-bold"
            style={{ borderRadius: "10px" }}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="text-center mt-3">
          <a href="/login" className="text-decoration-none fw-semibold">
            ← Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
