const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { cleanJSON } = require("../utils/parseResponse");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const isLikelySQL = (input) => /\bSELECT\b|\bFROM\b/i.test(input);

const detectTypeAndQueryGemini = async (input) => {
  const isSQL = isLikelySQL(input);
  const prompt = isSQL ? getSQLPrompt(input) : getNaturalPrompt(input);

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  const data = await response.json();
  const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  return cleanJSON(raw);
};

const getSQLPrompt = (query) => `
You will receive a SQL query. Explain it and convert it to visual blocks.

SQL Query:
${query}

Respond as JSON:
{
  "explanation": "...",
  "flow": [ { "type": "...", "details": "..." } ]
}
`;

const getNaturalPrompt = (text) => `
You will receive a natural language description. Generate SQL and a visual flow.

Description:
${text}

Respond as JSON:
{
  "sql": "...",
  "flow": [ { "type": "...", "details": "..." } ]
}
`;

module.exports = { detectTypeAndQueryGemini };
