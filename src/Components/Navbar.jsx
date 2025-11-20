// src/components/Navbar.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/navbar.css";

export default function Navbar({ showSearch = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <nav className="navbar">
      <button
        onClick={() => navigate(isLoginPage ? "/" : "/dashboard")}
        className="logo-btn"
        aria-label="Go to home"
      >
        <span className="logo-text">NoteNest</span>
      </button>

      {showSearch && (
        <input
          type="text"
          placeholder="Search your notes..."
          className="search-input"
          aria-label="Search notes"
        />
      )}

      {!isLoginPage && (
        <button onClick={() => navigate("/")} className="logout-btn">
          Logout
        </button>
      )}
    </nav>
  );
}