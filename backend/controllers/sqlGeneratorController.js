const { callGeminiAPI } = require("../services/geminiServices");

const extractJSON = (rawText) => {
  if (!rawText) return null;

  try {
    const cleaned = rawText
      .trim()
      .replace(/^```json/, "")
      .replace(/^```/, "")
      .replace(/```$/, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (err) {
    console.error("JSON parsing error:", err.message);
    return null;
  }
};

const handleGenerateSQL = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Invalid prompt" });
  }

  try {
    const rawText = await callGeminiAPI(prompt);
    const parsed = extractJSON(rawText);

    if (!parsed || (!parsed.sql && !parsed.explanation)) {
      return res.status(400).json({ error: "Missing required keys (sql, explanation) in AI response" });
    }

    return res.json({
      sql: parsed.sql?.trim() || "",
      explanation: parsed.explanation?.trim() || "",
      suggestions: Array.isArray(parsed.suggestions)
        ? parsed.suggestions.join("\n")
        : (parsed.suggestions || "").trim(),
      visualFlow: parsed.visualFlow || [],
    });

  } catch (err) {
    console.error("Gemini API error:", err.name, err.message);
    return res.status(500).json({ error: "Gemini API call failed" });
  }
};

module.exports = { handleGenerateSQL };
