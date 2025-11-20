import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar.jsx";
import "../css/browseNotes.css";
import "../css/global.css";

export default function BrowseNotes() {
  const navigate = useNavigate();

  // Hard-coded notes with unique ids
  const notes = [
    {
    id: 1,
    title: "Organic Chemistry Reactions",
    subject: "Chemistry",
    date: "Nov 18, 2025",
    description:
      "Comprehensive summary of nucleophilic substitution, elimination reactions, and carbonyl chemistry with mechanisms.",
    contents: `Organic Chemistry Reactions...`,
  },
  {
    id: 2,
    title: "World War II Timeline & Causes",
    subject: "History",
    date: "Nov 15, 2025",
    description:
      "Detailed timeline from Treaty of Versailles to Pearl Harbor, including political and economic factors leading to war.",
    contents: `World War II - Key Events & Causes....`,
  },
  {
    id: 3,
    title: "React Hooks Deep Dive",
    subject: "Computer Science",
    date: "Nov 12, 2025",
    description:
      "Complete guide to useState, useEffect, useContext, custom hooks, and performance optimization patterns.",
    contents: `React Hooks - Complete Guide...`,
  },
  {
    id: 4,
    title: "Calculus II - Integration Techniques",
    subject: "Mathematics",
    date: "Nov 10, 2025",
    description:
      "Step-by-step methods: integration by parts, trigonometric substitution, partial fractions, and improper integrals.",
    contents: `Calculus II - Advanced Integration...`,
  },
  {
    id: 5,
    title: "Test 1",
    subject: "Mathematics",
    date: "Nov 10, 2025",
    description: "Test",
    contents: `Test 1`,
  },
  {
    id: 6,
    title: "Test 2",
    subject: "Mathematics",
    date: "Nov 10, 2025",
    description: "Test",
    contents: `Test 2`,
  },
  {
    id: 7,
    title: "Test 3",
    subject: "Mathematics",
    date: "Nov 10, 2025",
    description: "Test",
    contents: `Test 3`,
  },
];

  const handleView = (id) => {
    navigate(`/viewnotes/${id}`);
  };

  const handleDownload = (note) => {
    const header = `# ${note.title}\n\n**Subject:** ${note.subject}\n**Uploaded:** ${note.date}\n**Description:** ${note.description}\n\n---\n`;
    const blob = new Blob([header + note.contents], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${note.title.replace(/[^a-z0-9]/gi, "_")}_NoteNest.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Navbar showSearch={true} />
      <main className="browse-wrapper">
        <div className="browse-header">
          <h1>Your Notes</h1>
          <p className="subtitle">Browse, preview, and download your study materials</p>
        </div>

        <div className="notes-scroll">
          <div className="notes-grid">
            <div className="note-card add-card" onClick={() => navigate("/upload")}>
              <div className="add-card-content">
                <span className="plus-icon">＋</span>
                <p>Add New Note</p>
              </div>
            </div>

            {notes.map((note) => (
              <div key={note.id} className="note-card">
                <div className="note-content">
                  <div className="note-header">
                    <h3 className="note-title">{note.title}</h3>
                    <span className="note-subject">{note.subject}</span>
                  </div>
                  <p className="note-description">{note.description}</p>
                  <div className="note-meta">
                    <span className="note-date">{note.date}</span>
                  </div>
                </div>
                <div className="note-actions">
                  <button className="view-btn" onClick={() => handleView(note.id)}>View</button>
                  <button className="download-btn" onClick={() => handleDownload(note)}>Download</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
