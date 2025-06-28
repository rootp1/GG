"use client";
import { useState, useContext } from "react";
import Link from "next/link";
import "@/styles/signin.css";
import { AuthContext } from "@/contexts/authContext";

export default function Signup() {
  const { signup } = useContext(AuthContext);
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container">
      <div className="left-panel">
        <div className="logo">🌴</div>
        <h1 className="logo-text">Platform for Personal Carbon Credits.</h1>
      </div>
      <div className="right-panel">
        <div className="form">
          <h2>Sign Up</h2>

          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            value={inputs.email || ""}
            onChange={handleChange}
          />

          <label htmlFor="username">Username</label>
          <input
            name="username"
            type="text"
            value={inputs.username || ""}
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            value={inputs.password || ""}
            onChange={handleChange}
          />

          <button
            className="submit-button"
            onClick={() => signup(inputs.email, inputs.username, inputs.password)}
          >
            Sign Up
          </button>

          <p>
            Already a user?{" "}
            <Link href="/signin">Sign In!</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
