import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar.jsx";
import "../css/dashboard.css";
import "../css/global.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  return (
    <>
      <Navbar showSearch={false} />
      <main className="dashboard-wrapper">
        <div className="dashboard-content">
          <h1>Welcome back!</h1>
          <p className="welcome-text">Manage and organize your notes with ease.</p>

          <div className="action-cards">
            <button className="action-card" onClick={() => navigate("/browse")}>
              <span className="icon">Browse</span>
              <h3>Browse Notes</h3>
              <p>View and download your saved notes</p>
            </button>

            <button className="action-card" onClick={() => navigate("/upload")}>
              <span className="icon">Upload</span>
              <h3>Upload New Note</h3>
              <p>Add new study materials</p>
            </button>
          </div>

          {selectedFile && (
            <div className="file-preview">
              Selected: <strong>{selectedFile.name}</strong>
            </div>
          )}
        </div>
      </main>
    </>
  );
}