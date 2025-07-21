function cleanJSON(rawText) {
  if (!rawText) return null;

  try {
    let cleaned = rawText.trim();

    cleaned = cleaned.replace(/^```json/, "")
                     .replace(/^```/, "")
                     .replace(/```$/, "")
                     .trim();

    // Try to extract first complete JSON block using regex
    const match = cleaned.match(/{[\s\S]*}/);
    if (match) {
      return JSON.parse(match[0]);
    }

    // fallback if match fails
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("JSON cleaning error:", err.message);
    return null;
  }
}

module.exports = { cleanJSON };
