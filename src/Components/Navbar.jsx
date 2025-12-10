// src/components/Navbar.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/navbar.css";

export default function Navbar({ showSearch = false, onSearch }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === "/" || location.pathname === "/login";

  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) onSearch(value);
  };

  return (
    <nav className="navbar">
      <button
        onClick={() => navigate(isLoginPage ? "/" : "/dashboard")}
        className="logo-btn"
        aria-label="Go to home"
      >
        <span className="logo-text">NoteNest</span>
      </button>

      {!isLoginPage && (
        <>
          <button onClick={() => navigate("/browse")} className="nav-btn">
            <span className="nav-text">Browse</span>
          </button>
          <button onClick={() => navigate("/upload")} className="nav-btn">
            <span className="nav-text">Upload</span>
          </button>
        </>
      )}

      {showSearch && (
        <input
          type="text"
          placeholder="Search by title, subject, or date..."
          className="search-input"
          value={searchQuery}
          onChange={handleSearch}
          aria-label="Search notes"
        />
      )}

      {!isLoginPage && (
        <button onClick={() => {
          localStorage.removeItem("user");
          navigate("/")
        }} className="logout-btn">
          Logout
        </button>
      )}
    </nav>
  );
}