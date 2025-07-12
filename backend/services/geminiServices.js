require("dotenv").config();
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;


const callGeminiAPI = async (prompt) => {
   const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  const data = await response.json();
  if (!response.ok) {
  const errorData = await response.json();
  console.error("❌ Gemini API error response:", errorData);
  throw new Error("Gemini API returned non-200 response.");
}

return data?.candidates?.[0]?.content?.parts?.[0]?.text;
};

module.exports = { callGeminiAPI };
