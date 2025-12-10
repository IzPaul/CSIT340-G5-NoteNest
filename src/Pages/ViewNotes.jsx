// ViewNotes.jsx — FINAL WITH EDIT + DELETE
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useNotes } from "../Context/NotesContext.jsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Navbar from "../Components/Navbar.jsx";
import { api } from "../api/api";
import "../css/viewNotes.css";

export default function ViewNotes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notes, reloadNotes } = useNotes();

  const note = notes.find((n) => n.noteId === parseInt(id));
  const [mode, setMode] = useState("view");
  const [editedNote, setEditedNote] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!note) {
    return (
      <>
        <Navbar showSearch={false} />
        <main style={{ textAlign: "center", paddingTop: "100px" }}>
          <p>Note not found.</p>
          <button className="back-btn" onClick={() => navigate("/browse")}>
            Back to Browse
          </button>
        </main>
      </>
    );
  }

  const startEdit = () => {
    setEditedNote({ ...note });
    setMode("edit");
  };

  const cancelEdit = () => {
    setEditedNote(null);
    setMode("view");
  };

  const saveEdit = async () => {
    setLoading(true);
    try {
      await api.updateNote(note.noteId, editedNote);
      await reloadNotes();
      setMode("view");
      setEditedNote(null);
    } catch (err) {
      alert("Failed to save changes");
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async () => {
    if (!window.confirm("Delete this note permanently?")) return;

    setLoading(true);
    try {
      await api.deleteNote(note.noteId);
      await reloadNotes();
      navigate("/browse");
    } catch (err) {
      alert("Failed to delete note");
    }
  };

  return (
    <>
      <Navbar showSearch={false} />
      <main className="view-wrapper">
        <div className="view-card">
          <div className="view-header">
            {mode === "view" ? (
              <h1>{note.title}</h1>
            ) : (
              <input
                type="text"
                value={editedNote?.title || ""}
                onChange={(e) => setEditedNote({ ...editedNote, title: e.target.value })}
                className="edit-title-input"
                autoFocus
              />
            )}

            <div className="view-actions">
              {mode === "view" ? (
                <>
                  <button onClick={startEdit} className="edit-btn">Edit</button>
                  <button onClick={deleteNote} className="delete-btn">
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <button onClick={saveEdit} disabled={loading} className="save-btn">
                    {loading ? "Saving..." : "Save"}
                  </button>
                  <button onClick={cancelEdit} className="cancel-btn">
                    Cancel
                  </button>
                </>
              )}
              <button className="back-btn" onClick={() => navigate(-1)}>
                Back
              </button>
            </div>
          </div>

          <div className="view-scroll">
            {/* Subject */}
            <div className="note-meta">
              {mode === "view" ? (
                <p className="note-subject">{note.subject}</p>
              ) : (
                <input
                  type="text"
                  value={editedNote?.subject || ""}
                  onChange={(e) => setEditedNote({ ...editedNote, subject: e.target.value })}
                  placeholder="Subject"
                  className="edit-input"
                />
              )}

              <p className="note-date">
                {new Date(note.uploadDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>

            {mode === "view" ? (
              <p className="note-description">{note.description}</p>
            ) : (
              <textarea
                value={editedNote?.description || ""}
                onChange={(e) => setEditedNote({ ...editedNote, description: e.target.value })}
                placeholder="Description"
                rows="3"
                className="edit-textarea"
              />
            )}
            {mode === "view" ? (
              <div className="note-content-area">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {note.content}
                </ReactMarkdown>
              </div>
            ) : (
              <textarea
                value={editedNote?.content || ""}
                onChange={(e) => setEditedNote({ ...editedNote, content: e.target.value })}
                className="edit-content-textarea"
                rows="20"
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
}