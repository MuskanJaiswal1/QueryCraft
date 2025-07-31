export const generateSQLFromFlow = async (prompt) => {
  const res = await fetch("https://query-craft-backend.onrender.com/generate-sql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  return await res.json();
};
