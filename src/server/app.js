// Requires
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");

// Initialize express app
const app = express();

// Environment variables
let envPath;
if (process.env.NODE_ENV === "production") {
  envPath = ".env.production";
} else if (process.env.NODE_ENV === "test") {
  envPath = ".env.test";
} else {
  envPath = ".env.development";
}

const projectRootPath = path.resolve(__dirname, "../../");
require("dotenv").config({ path: path.resolve(projectRootPath, envPath) });
const { PORT } = process.env;

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Set static folder
app.use(express.static("public"));

// Body parser middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

// Use routes
const indexRoutes = require("./routes/indexRoutes");
app.use("/", indexRoutes);
const registerRoutes = require("./routes/registerRoutes");
app.use("/", registerRoutes);
const loginRoutes = require("./routes/loginRoutes");
app.use("/", loginRoutes);
const dashboardRoutes = require("./routes/dashboardRoutes");
app.use("/", dashboardRoutes);
const relationshipRoutes = require("./routes/relationshipRoutes");
app.use("/", relationshipRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;