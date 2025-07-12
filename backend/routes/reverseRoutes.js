const express = require("express");
const router = express.Router();
const { handleReverseSQL } = require("../controllers/reverseController");

router.post("/", handleReverseSQL);
module.exports = router;
