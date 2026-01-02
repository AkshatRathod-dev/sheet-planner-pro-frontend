// This looks for the Vercel variable, otherwise falls back to local for testing
const API = import.meta.env.VITE_API_URL || "https://sheet-planner-pro-api.onrender.com";

export const calculate = async (payload) => {
  const res = await fetch(`${API}/api/calculate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return res.json();
};