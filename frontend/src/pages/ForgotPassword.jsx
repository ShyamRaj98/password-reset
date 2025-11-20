import React, { useState } from "react";
import API from "../api/axios.js";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/auth/forgot-password", { email });
      setMsg({ type: "success", text: res.data.message });
    } catch (err) {
      setMsg({ type: "danger", text: err.response?.data?.message || "Error" });
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h3>Forgot Password</h3>
        {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Enter your registered email</label>
            <input type="email" className="form-control" required value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <button className="btn btn-primary">Send Reset Link</button>
        </form>
      </div>
    </div>
  );
}
