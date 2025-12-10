import React, { createContext, useContext, useReducer, useMemo } from "react";

const NotesContext = createContext();

const initialNotes = [
    {
        id: 1,
        title: "Organic Chemistry Reactions",
        subject: "Chemistry",
        date: "Nov 18, 2025",
        description:
        "Comprehensive summary of nucleophilic substitution, elimination reactions, and carbonyl chemistry with mechanisms.",
        content: `Organic Chemistry Reactions...`,
    },
    {
        id: 2,
        title: "World War II Timeline & Causes",
        subject: "History",
        date: "Nov 15, 2025",
        description:
        "Detailed timeline from Treaty of Versailles to Pearl Harbor, including political and economic factors leading to war.",
        content: `World War II - Key Events & Causes....`,
    },
    {
        id: 3,
        title: "React Hooks Deep Dive",
        subject: "Computer Science",
        date: "Nov 12, 2025",
        description:
        "Complete guide to useState, useEffect, useContext, custom hooks, and performance optimization patterns.",
        content: `React Hooks - Complete Guide...`,
    },
    {
        id: 4,
        title: "Calculus II - Integration Techniques",
        subject: "Mathematics",
        date: "Nov 10, 2025",
        description:
        "Step-by-step methods: integration by parts, trigonometric substitution, partial fractions, and improper integrals.",
        content: `Calculus II - Advanced Integration...`,
    },
    {
        id: 5,
        title: "Test 1",
        subject: "Mathematics",
        date: "Nov 10, 2025",
        description: "Test",
        content: `Test 1`,
    },
    {
        id: 6,
        title: "Test 2",
        subject: "Mathematics",
        date: "Nov 10, 2025",
        description: "Test",
        content: `Test 2`,
    },
    {
        id: 7,
        title: "Test 3",
        subject: "Mathematics",
        date: "Nov 10, 2025",
        description: "Test",
        content: `Test 3`,
    },
];


function notesReducer(state, action) {
  switch (action.type) {
    case "ADD_NOTE":
      const newNote = {
        ...action.payload,
        id: Math.max(...state.map(n => n.id), 0) + 1,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        content: action.payload.content || "",
      };
      return [...state, newNote];

    case "DELETE_NOTE":
      return state.filter(note => note.id !== action.payload);

    default:
      return state;
  }
}

export function NotesProvider({ children }) {
  const [notes, dispatch] = useReducer(notesReducer, initialNotes);

  const subjects = useMemo(() => {
    const all = notes.map(n => n.subject || "General");
    return Array.from(new Set(["General", ...all])).sort();
  }, [notes]);

  const addNote = (noteData) => {
    dispatch({ type: "ADD_NOTE", payload: noteData });
  };

  return (
    <NotesContext.Provider value={{ notes, subjects, addNote, dispatch }}>
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