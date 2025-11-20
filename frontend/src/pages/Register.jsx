import React, { useState } from "react";
import API from "../api/axios.js";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState(null);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/auth/register", { email, password, name });
      setMsg({ type: "success", text: res.data.message });
      setTimeout(() => nav("/login"), 1200);
    } catch (err) {
      setMsg({ type: "danger", text: err.response?.data?.message || "Error" });
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h3>Register</h3>
        {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Name (optional)</label>
            <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  );
}
