const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Lazy import for node-fetch
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// Helper to extract JSON from possible markdown-wrapped response
function extractJSON(rawText) {
  if (!rawText) return null;

  try {
    // Remove any ```json or ``` wrapper
    const cleaned = rawText
      .trim()
      .replace(/^```json/, "")
      .replace(/^```/, "")
      .replace(/```$/, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (err) {
    console.error("❌ JSON parsing error:", err.message);
    return null;
  }
}

app.post("/generate-sql", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Invalid prompt" });
  }

  try {
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
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    // console.log("🔎 Gemini raw output:\n", rawText);

    const parsed = extractJSON(rawText);

    if (
      !parsed ||
      typeof parsed.sql !== "string" ||
      typeof parsed.explanation !== "string" ||
      typeof parsed.suggestions !== "string" && !Array.isArray(parsed.suggestions)
    ) {
      return res.status(400).json({ error: "Missing expected keys in AI response" });
    }

    res.json({
      sql: parsed.sql.trim(),
      explanation: parsed.explanation.trim(),
      suggestions: Array.isArray(parsed.suggestions)
        ? parsed.suggestions.join("\n")
        : parsed.suggestions.trim(),
    });
  } catch (err) {
    console.error("❌ Gemini API error:", err.name, err.message);
    return res.status(500).json({ error: "Gemini API call failed" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
