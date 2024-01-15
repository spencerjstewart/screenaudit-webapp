const express = require("express");
const router = express.Router();
const { renderHomePage } = require("../controllers/indexController");

router.get("/", renderHomePage);

module.exports = router;
