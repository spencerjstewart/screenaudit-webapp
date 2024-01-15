const path = require("path");
const envPath =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";
require("dotenv").config({ path: path.resolve(process.cwd(), envPath) });

const express = require("express");
const app = express();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get("/test", (req, res) => {
  res.json({ message: "Test endpoint reached" });
});
