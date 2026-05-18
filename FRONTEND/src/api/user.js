// ✅ New (Vite style)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function getUser(userId) {
    const res = await fetch(`${API_URL}/user/${userId}`);
    const data = await res.json();
    return data;
}