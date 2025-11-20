import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar.jsx";
import "../css/login.css";
import "../css/global.css";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <>

      {/* Navbar logout button ky dina makita */}
      <Navbar showLogout={false} />

      <main className="login-wrapper">
        <div className="login-grid">
          <h1 className="hero-title">Note<br />Nest</h1>

          <div className="login-card">
            <h2>Welcome Back</h2>
            <p className="subtitle">Sign in to access your notes</p>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Username or Email"
                className="input"
              />
              <input
                type="password"
                placeholder="Password"
                className="input"
              />

              <button type="submit" className="primary-btn">
                Sign In
              </button>
            </form>

            <p className="switch-auth">
              Don’t have an account?{" "}
              <span onClick={() => navigate("/register")}>Create an account</span>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
