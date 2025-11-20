import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar.jsx";
import "../css/upload.css";

export default function Upload() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  return (
    <>
      <Navbar showSearch={false} />
      <main className="upload-wrapper">
        <div className="upload-card">
          <h1>Upload New Note</h1>
          <p>Add a new study note to your collection</p>

          <div className="upload-form">
            <div className="form-grid">
              <div>
                <label>Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Organic Chemistry Summary" />
              </div>
              <div>
                <label>Subject</label>
                <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Chemistry, Physics, Literature" />
              </div>
            </div>

            <label>Description (optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of this note..."
              rows="4"
            />

            <label>Upload File</label>
            <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} style={{display: 'none'}} />
            <label htmlFor="file" className="file-upload-label">
              {file ? <>Selected: {file.name}</> : "Click to choose file (PDF, DOC, TXT, MD)"}
            </label>

            <button className="primary-btn large" disabled={!file || !title}>
              {file && title ? "Upload to NoteNest" : "Fill required fields"}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}