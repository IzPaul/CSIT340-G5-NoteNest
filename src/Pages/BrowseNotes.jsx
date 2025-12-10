import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { notes, useNotes } from "../Context/NotesContext.jsx";
import Navbar from "../Components/Navbar.jsx";
import "../css/browseNotes.css";
import "../css/global.css";

export default function BrowseNotes() {
  const navigate = useNavigate();
  const { notes } = useNotes();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotes = notes.filter((note) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(query) ||
      note.subject.toLowerCase().includes(query) ||
      note.date.toLowerCase().includes(query)
    );
  });

  const handleView = (noteId) => {
    navigate(`/viewnotes/${noteId}`);
  };

  const handleDownload = (note) => {
    const header = `# ${note.title}\n\n**Subject:** ${note.subject}\n**Uploaded:** ${note.date}\n**Description:** ${note.description}\n\n---\n`;
    const content = note.content || "";
    const blob = new Blob([header + content], { type: "text/markdown" });
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
      <Navbar showSearch={true} onSearch={setSearchQuery} />
      
      <main className="browse-wrapper">
        <div className="browse-header">
          <h1>
            Your Notes {searchQuery && `(${filteredNotes.length} found)`}
          </h1>
          <p className="subtitle">
            {searchQuery 
              ? `Searching for "${searchQuery}"`
              : "Browse, preview, and download your study materials"
            }
          </p>
        </div>

        <div className="notes-scroll">
          <div className="notes-grid">
            <div className="note-card add-card" onClick={() => navigate("/upload")}>
              <div className="add-card-content">
                <span className="plus-icon">+</span>
                <p>Add New Note</p>
              </div>
            </div>

            {filteredNotes.length === 0 ? (
              <div className="empty-state">
                <p>
                  {searchQuery 
                    ? `No notes found for "${searchQuery}"`
                    : "No notes yet. Click 'Add New Note' to get started!"
                  }
                </p>
              </div>
            ) : (
              filteredNotes.map((note) => (
                <div key={note.Id} className="note-card">
                  <div className="note-content">
                    <div className="note-header">
                      <h3 className="note-title">{note.title}</h3>
                      <span className="note-subject">{note.subject}</span>
                    </div>
                    <p className="note-description">{note.description}</p>
                    <div className="note-meta">
                      <span className="note-date">
                        {note.uploadDate 
                          ? new Date(note.uploadDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric"
                            })
                          : "No date"}
                      </span>
                    </div>
                  </div>
                  <div className="note-actions">
                    <button className="view-btn" onClick={() => handleView(note.noteId)}>
                      View
                    </button>
                    <button className="download-btn" onClick={() => handleDownload(note)}>
                      Download
                    </button>
                  </div>
                </div>
              ))
            )}
            
          </div>
        </div>
      </main>
    </>
  );
}
