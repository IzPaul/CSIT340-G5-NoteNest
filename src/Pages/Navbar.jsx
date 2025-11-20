import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Navbar.css"; 

export default function Navbar({ showLogout = true }) {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <button className="logo-btn" onClick={() => navigate("/")}>
        NoteNest
      </button>

      {showLogout && (
        <button
          className="logout-btn"
          onClick={() => {
            console.log("Logging out...");
            navigate("/login");
          }}
        >
          LOGOUT
        </button>
      )}
    </nav>
  );
}
