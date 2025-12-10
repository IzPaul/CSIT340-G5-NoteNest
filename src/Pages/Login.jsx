import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar.jsx";
import { api } from "../api/api";
import "../css/login.css";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
      setError("");
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      setLoading(true);
      try {
        const res = await api.login({
          username: form.username,
          password: form.password,
        });
  
        if (res.success) {
          // Save user info para automatic login or protect from not logged in users
          localStorage.setItem("user", JSON.stringify({
            userId: res.userId,
            username: res.username
          }));
          window.dispatchEvent(new Event("storage"));

          alert("Login successful!");
          navigate("/dashboard");
        } else {
          setError(res.message || "Registration failed");
        }
      } catch (err) {
        setError("Network error. Is backend running on port 8080?");
      } finally {
        setLoading(false);
      }
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

            {error && <div className="error-alert">{error}</div>}

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Username"
                className="input"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="input"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />

              <button type="submit" className="primary-btn" disabled={loading}>
                  {loading ? "Signing In..." : "Sign In"}
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
