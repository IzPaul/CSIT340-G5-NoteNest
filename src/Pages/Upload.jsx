import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotes } from "../Context/NotesContext.jsx";
import Navbar from "../Components/Navbar.jsx";
import "../css/upload.css";

export default function Upload() {
  const navigate = useNavigate();
  const { addNote, subjects } = useNotes();
  const [mode, setMode] = useState("upload");

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [noteContent, setNoteContent] = useState("");
  const [viewMode, setViewMode] = useState('editor');

  const handleSubmit = (e) => {
    e.preventDefault();

    const baseNote = {
      title: title.trim(),
      subject: subject.trim() || "General",
      description: description.trim() || "No description provided.",
    };

    try{
      if (mode === "upload" && file) {
        const reader = new FileReader();
        reader.onload = () => {
          addNote({
            ...baseNote,
            content: `File uploaded: ${file.name}\n\n${reader.result?.slice(0, 500)}...`,
            fileName: file.name,
            fileType: file.type,
            uploadDate: new Date().toISOString(),
          });
          navigate("/browse");
        };
        reader.readAsText(file);
      } 
      else if (mode === "write" && title.trim() && subject.trim() && noteContent.trim()) {
        addNote({
          ...baseNote,
          content: noteContent.trim(),
          uploadDate: new Date().toISOString(),
        });
        navigate("/browse");
      }

    }catch (err) {
      console.error("Save failed: ",err);
      alert("Failed to save note.");
    }

    console.log(mode === "upload" ? "Uploading file..." : "Saving written note...");
  };

  return (
    <>
      <Navbar showSearch={false} />

      <main className="upload-wrapper">
        <div className="upload-container">
          <div className="upload-card-with-sidebar">
            
            <div className="sidebar-tabs">
              <button
                className={`sidebar-tab ${mode === "upload" ? "active" : ""}`}
                onClick={() => setMode("upload")}
              >
                <span className="tab-icon">Upload</span>
                <span className="tab-text">Upload File</span>
              </button>
              <button
                className={`sidebar-tab ${mode === "write" ? "active" : ""}`}
                onClick={() => setMode("write")}
              >
                <span className="tab-icon">Write</span>
                <span className="tab-text">Write Note</span>
              </button>
            </div>

            <div className="upload-card">
              <h1>{mode === "upload" ? "Upload New Note" : "Write New Note"}</h1>
              <p>Add a new study note to your collection</p>

              <form className="upload-form" onSubmit={handleSubmit}>
                {mode === "upload" ? (
                  <>
                    <div className="form-grid">
                      <div>
                        <label>Title <span className="required">*</span></label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                              placeholder="e.g. Organic Chemistry Summary" required />
                      </div>
                      <div>
                        <label style={{ marginTop: "24px" }}>Subject <span className="required">*</span></label>
                        <input
                          type="text"
                          list="subjects-datalist"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          placeholder="Type subject (e.g. Biology, Physics...)"
                          required
                          className="subject-input"
                        />

                        <datalist id="subjects-datalist">
                          {subjects.map((subj) => (
                            <option key={subj} value={subj} />
                          ))}
                        </datalist>
                      </div>
                    </div>

                    <label>Description (optional)</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                              placeholder="Brief description of this note..." rows="3" />

                    <label>Upload File <span className="required">*</span></label>
                    <input type="file" id="file" accept=".pdf,.doc,.docx,.txt,.md"
                          onChange={(e) => setFile(e.target.files?.[0] || null)} style={{display: "none"}} />
                    <label htmlFor="file" className="file-upload-label">
                      {file ? <>Selected: {file.name}</> : "Click to choose file (PDF, DOC, TXT, MD)"}
                    </label>
                  </>
                ) : (
                  <>
                    <div className="write-mode-header">
                      <h3>Note Content <span className="required">*</span></h3>
                      <div className="preview-mode-toggle">
                        <button
                          type="button"
                          className={`mode-btn ${viewMode === 'editor' ? 'active' : ''}`}
                          onClick={() => setViewMode('editor')}
                          title="Editor only"
                        >
                          Editor
                        </button>
                        <button
                          type="button"
                          className={`mode-btn ${viewMode === 'split' ? 'active' : ''}`}
                          onClick={() => setViewMode('split')}
                          title="Split view"
                        >
                          Split
                        </button>
                        <button
                          type="button"
                          className={`mode-btn ${viewMode === 'preview' ? 'active' : ''}`}
                          onClick={() => setViewMode('preview')}
                          title="Preview only"
                        >
                          Preview
                        </button>
                      </div>
                    </div>

                    <div className={`write-mode-grid ${viewMode}`}>
                      {(viewMode === 'split' || viewMode === 'editor') && (
                        <div className="write-left">
                          <label>Title <span className="required">*</span></label>
                          <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Organic Chemistry Summary"
                            required
                          />

                          <label style={{ marginTop: "24px" }}>Subject <span className="required">*</span></label>
                          <input
                            type="text"
                            list="subjects-datalist"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Type subject (e.g. Biology, Physics...)"
                            required
                            className="subject-input"
                          />

                          <datalist id="subjects-datalist">
                            {subjects.map((subj) => (
                              <option key={subj} value={subj} />
                            ))}
                          </datalist>

                          <label style={{ marginTop: "24px" }}>Description (optional)</label>
                          <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Brief description of this note..."
                            rows="4"
                          />

                          <label>Content <span className="required">*</span></label>
                          <textarea
                            value={noteContent}
                            onChange={(e) => setNoteContent(e.target.value)}
                            placeholder="Start writing your note here... Markdown supported!"
                            className="note-content-textarea markdown-editor"
                          />
                          <small className="char-counter">
                            {noteContent.length}/20000 characters
                          </small>
                        </div>
                      )}

                      {(viewMode === 'split' || viewMode === 'preview') && (
                        <div className="write-right">
                          <div className="preview-header">
                            <h3>Live Markdown Preview</h3>
                          </div>
                          <div className="markdown-preview">
                            {noteContent.trim() ? (
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {noteContent}
                              </ReactMarkdown>
                            ) : (
                              <p className="preview-placeholder">
                                {viewMode === 'preview' 
                                  ? "No content yet. Start typing in Editor mode!" 
                                  : "Start typing to see the live preview..."}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="primary-btn large"
                  style={{ marginTop: mode === "write" ? "32px" : "40px" }}
                  disabled={mode === "upload" ? !(file && title.trim()) : !(title.trim() && subject.trim() && noteContent.trim())}
                >
                  {mode === "upload"
                    ? (file && title.trim() ? "Upload to NoteNest" : "Select a file and add a title")
                    : (title.trim() && subject.trim() && noteContent.trim() ? "Save Note to NoteNest" : "Fill in the title, subject, or content field/s")
                  }
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}