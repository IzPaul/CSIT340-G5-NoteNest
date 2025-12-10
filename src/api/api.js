const API_URL = "http://localhost:8080/api";

const getUserId = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user?.userId;
  } catch {
    return null;
  }
};

export const api = {
  //Users Authentication
  register: (data) => fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json()),

  login: (data) => fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json()),

  //Para sa Notes
  getNotes: async () => {
    const userId = getUserId();
    if (!userId) return [];
    const res = await fetch(`${API_URL}/notes/user/${userId}`);
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  },

  getNote: async (noteId) => {
    const userId = getUserId();
    if(!userId) throw new Error ("Not logged in");
    const res = await fetch(`${API_URL}/notes/${noteId}/user/${userId}`);
    return res.json();
  },

  createNote: async (noteData) => {
    const userId = getUserId();
    if(!userId) throw new Error ("Not logged in");
    const res = await fetch(`${API_URL}/notes/user/${userId}`,{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(noteData),
    });
    if (!res.ok) throw new Error("Save failed");
    return res.json();
  },

};