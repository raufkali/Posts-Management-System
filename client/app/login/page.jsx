"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [responseMessage, setResponseMessage] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setResponseMessage("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token); // Save JWT token
      setResponseMessage("✅ Login successful!");

      setTimeout(() => {
        router.push("/create-post"); // ✅ use router.push() instead of navigate()
      }, 1000);
    } catch (error) {
      setResponseMessage("❌ " + error.message);
    }
  };

  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4">Login</h2>

      {responseMessage && (
        <div className="alert alert-info">{responseMessage}</div>
      )}

      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-bold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={credentials.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label fw-bold">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={credentials.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
