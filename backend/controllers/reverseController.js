const { detectTypeAndQueryGemini } = require("../services/reverseService");

const handleReverseSQL = async (req, res) => {
  const { input } = req.body;
  if (!input || typeof input !== "string") {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    const result = await detectTypeAndQueryGemini(input);
    return res.json(result);
  } catch (err) {
    console.error("Reverse SQL Error:", err.message);
    return res.status(500).json({ error: "Reverse SQL processing failed" });
  }
};

module.exports = { handleReverseSQL };
