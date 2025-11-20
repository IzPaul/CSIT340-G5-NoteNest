import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar.jsx";
import "../css/viewNotes.css";

export default function ViewNotes() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Hard-coded notes (same as BrowseNotes)
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

  const note = notes.find((n) => n.id === parseInt(id));

  if (!note) {
    return (
      <main style={{ textAlign: "center", paddingTop: "100px" }}>
        <p>Note not found.</p>
        <button onClick={() => navigate("/browse")}>Back to Browse Notes</button>
      </main>
    );
  }

  return (
    <>
      <Navbar showSearch={false} />
      <main className="view-wrapper">
        <div className="view-card">
          <h1>{note.title}</h1>
          <p className="note-subject">{note.subject}</p>
          <p className="note-date">{note.date}</p>
          <p className="note-description">{note.description}</p>
          <pre className="note-contents">{note.contents}</pre>
          <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
        </div>
      </main>
    </>
  );
}
