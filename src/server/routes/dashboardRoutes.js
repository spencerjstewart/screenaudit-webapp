const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const authenticateToken = require("../middleware/jwtAuth");

router.get("/dashboard", authenticateToken, dashboardController.dashboardPage);

module.exports = router;