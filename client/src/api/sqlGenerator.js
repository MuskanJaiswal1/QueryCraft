export const generateSQLFromFlow = async (prompt) => {
  const res = await fetch("http://localhost:4000/generate-sql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  return await res.json();
};
