const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sqlRoutes = require("./routes/sqlGeneratorRoutes");
const reverseRoutes = require("./routes/reverseRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Mount routes
app.use("/generate-sql", sqlRoutes);
app.use("/reverse-sql", reverseRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
