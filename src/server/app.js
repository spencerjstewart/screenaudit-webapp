// Requires
const path = require("path");
const express = require("express");

// Initialize express app
const app = express();

// Environment variables
const envPath =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";
require("dotenv").config({ path: path.resolve(process.cwd(), envPath) });
const { PORT } = process.env;

// Set view engine
app.set("view engine", "ejs");

// Use routes
const indexRoutes = require("./routes/indexRoutes");
app.use("/", indexRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
