import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios.js";

export default function ResetPassword() {
  const { token } = useParams();
  const nav = useNavigate();
  const [valid, setValid] = useState(null);
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get(`/api/auth/verify-token/${token}`);
        setValid(res.data.valid);
      } catch (err) {
        setValid(false);
      }
    })();
  }, [token]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post(`/api/auth/reset-password/${token}`, { password });
      setMsg({ type: "success", text: res.data.message });
      setTimeout(() => nav("/login"), 1200);
    } catch (err) {
      setMsg({ type: "danger", text: err.response?.data?.message || "Error" });
    }
  };

  if (valid === null) return <p>Checking link...</p>;
  if (!valid) return <div className="alert alert-danger">Invalid or expired reset link.</div>;

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h3>Reset Password</h3>
        {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input type="password" className="form-control" required minLength={6} value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className="btn btn-primary">Change Password</button>
        </form>
      </div>
    </div>
  );
}
