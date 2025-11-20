import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../api";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");
    try {
      const res = await API.post(`/auth/reset-password/${token}`, { password });
      setMsg(res.data.message);
      setPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <div className="flex justify-center items-center font-oswald">
      <div className="p-2 w-96">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Password Field */}
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none"
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-3.5 text-gray-500 cursor-pointer"
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300 cursor-pointer"
          >
            Reset Password
          </button>
        </form>

        {/* Messages */}
        {msg && (
          <p className="text-green-600 text-center mt-4 font-medium">{msg}</p>
        )}
        {error && (
          <p className="text-red-600 text-center mt-4 font-medium">{error}</p>
        )}
      </div>
    </div>
  );
}