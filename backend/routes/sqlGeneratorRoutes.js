const express = require("express");
const router = express.Router();
const { handleGenerateSQL } = require("../controllers/sqlGeneratorController");

router.post("/", handleGenerateSQL);

module.exports = router;
