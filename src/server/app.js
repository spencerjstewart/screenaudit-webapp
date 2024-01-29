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

// Set static folder
app.use(express.static("public"));

// Body parser middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Use routes
const indexRoutes = require("./routes/indexRoutes");
app.use("/", indexRoutes);
const registerRoutes = require("./routes/registerRoutes");
app.use("/", registerRoutes);
const loginRoutes = require("./routes/loginRoutes");
app.use("/login", loginRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;