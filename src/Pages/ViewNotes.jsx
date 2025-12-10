import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useNotes } from "../Context/NotesContext.jsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Navbar from "../Components/Navbar.jsx";
import "../css/viewNotes.css";

export default function ViewNotes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notes } = useNotes();
  const [viewMode, setViewMode] = useState("rendered");

  const note = notes.find((n) => n.noteId === parseInt(id));

  if (!note) {
    return (
      <>
        <Navbar showSearch={false} />
        <main style={{ textAlign: "center", paddingTop: "100px" }}>
          <p>Note not found.</p>
          <button class="back-btn" onClick={() => navigate("/browse")}>Back to Browse Notes</button>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar showSearch={false} />
      <main className="view-wrapper">
        <div className="view-card">
          <div className="view-header">
            <h1>{note.title}</h1>
            
            <div className="view-mode-toggle">
              <button
                className={`mode-btn ${viewMode === "rendered" ? "active" : ""}`}
                onClick={() => setViewMode("rendered")}
              >
                Normal
              </button>
              <button
                className={`mode-btn ${viewMode === "markdown" ? "active" : ""}`}
                onClick={() => setViewMode("markdown")}
              >
                Raw
              </button>
            </div>
            <button className="back-btn" onClick={() => navigate(-1)}>
            Back
          </button>
          </div>

          <div class="view-scroll">
            <div className="note-meta">
              <p className="note-subject">{note.subject}</p>
              <p className="note-date">{note.uploadDate}</p>
            </div>

            <p className="note-description">{note.description}</p>

            <div className={`note-content-area ${viewMode}`}>
              {viewMode === "rendered" ? (
                <div className="rendered-view">
                  {note.content.trim() ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {note.content}
                    </ReactMarkdown>
                  ) : (
                    <p className="empty-note">No content</p>
                  )}
                </div>
              ) : (
                <pre className="markdown-source">
                  <code>{note.content || "(empty)"}</code>
                </pre>
              )}
            </div>
          </div>

        </div>
      </main>
    </>
  );
}