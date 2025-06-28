"use client";
import { useState, useContext } from "react";
import Link from "next/link";
import "@/styles/signin.css";
import { AuthContext } from "@/contexts/authContext";

export default function Signin() {
  const { isAuthenticated, user, signup, login, logout } = useContext(AuthContext);
  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  return (
    <div className="container">
      <div className="left-panel">
        <div className="anim">
          <div className="logo lhead">🌴Carbon Credit for all</div>
        </div>
        <div>
          <h1 className="logo-text">Platform for Personal Carbon Credits.</h1>
        </div>
      </div>
      <div className="right-panel">
        <div className="form">
          <h2>sign in</h2>
          <div htmlFor="username">Name</div>
          <input
            name="username"
            type="text"
            value={inputs.username || ""}
            onChange={handleChange}
          />
          <div htmlFor="password">Password</div>
          <input
            name="password"
            type="password"
            value={inputs.password || ""}
            onChange={handleChange}
          />
          <button className="submit-button" onClick={() => { login(inputs.username, inputs.password); }}>
            Sign In
          </button>
          <p>
            Don't have an account?{" "}
            <Link href="/signup">Sign Up!</Link>
          </p>
        </div>
        <p>{}</p>
      </div>
    </div>
  );
}
