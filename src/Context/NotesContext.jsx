import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { api } from "../api/api";

// const initialNotes = [
//     {
//         id: 1,
//         title: "Organic Chemistry Reactions",
//         subject: "Chemistry",
//         date: "Nov 18, 2025",
//         description:
//         "Comprehensive summary of nucleophilic substitution, elimination reactions, and carbonyl chemistry with mechanisms.",
//         content: `Organic Chemistry Reactions...`,
//     },
//     {
//         id: 2,
//         title: "World War II Timeline & Causes",
//         subject: "History",
//         date: "Nov 15, 2025",
//         description:
//         "Detailed timeline from Treaty of Versailles to Pearl Harbor, including political and economic factors leading to war.",
//         content: `World War II - Key Events & Causes....`,
//     },
//     {
//         id: 3,
//         title: "React Hooks Deep Dive",
//         subject: "Computer Science",
//         date: "Nov 12, 2025",
//         description:
//         "Complete guide to useState, useEffect, useContext, custom hooks, and performance optimization patterns.",
//         content: `React Hooks - Complete Guide...`,
//     },
//     {
//         id: 4,
//         title: "Calculus II - Integration Techniques",
//         subject: "Mathematics",
//         date: "Nov 10, 2025",
//         description:
//         "Step-by-step methods: integration by parts, trigonometric substitution, partial fractions, and improper integrals.",
//         content: `Calculus II - Advanced Integration...`,
//     },
//     {
//         id: 5,
//         title: "Test 1",
//         subject: "Mathematics",
//         date: "Nov 10, 2025",
//         description: "Test",
//         content: `Test 1`,
//     },
//     {
//         id: 6,
//         title: "Test 2",
//         subject: "Mathematics",
//         date: "Nov 10, 2025",
//         description: "Test",
//         content: `Test 2`,
//     },
//     {
//         id: 7,
//         title: "Test 3",
//         subject: "Mathematics",
//         date: "Nov 10, 2025",
//         description: "Test",
//         content: `Test 3`,
//     },
// ];

const NotesContext = createContext();

const getUserId = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user?.userId || null;
  } catch {
    return null;
  }
};

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadNotes = async () => {
    const userId = getUserId();
    if (!userId) {
      setNotes([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const data = await api.getNotes();
      setNotes(data);
    } catch (err) {
      console.error("Failed to load notes:", err);
      setError("Failed to load notes. Are you logged in?");
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    const handleStorage = () => loadNotes();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const addNote = async (noteData) => {
    const userId = getUserId();
    if (!userId) throw new Error("Not logged in");

    try {
      const newNote = await api.createNote(noteData);
      setNotes(prev => [...prev, newNote]);
      return newNote;
    } catch (err) {
      throw err;
    }
  };

  const reloadNotes = () => loadNotes();

  const subjects = useMemo(() => {
    const all = notes.map(n => n.subject || "General");
    return Array.from(new Set(["General", ...all])).sort();
  }, [notes]);

  return (
    <NotesContext.Provider value={{ 
      notes, 
      loading, 
      error, 
      subjects,
      addNote, 
      reloadNotes 
    }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within NotesProvider");
  }
  return context;
}