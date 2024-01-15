if (process.env.NODE_ENV === "production") {
  require("dotenv").config({ path: "../../.env.production" });
} else {
  require("dotenv").config({ path: "../../.env.development" });
}

const express = require("express");
const app = express();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get("/test", (req, res) => {
  res.json({ message: "Test endpoint reached" });
});
