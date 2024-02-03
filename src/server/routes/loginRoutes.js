const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");
const validations = require("../middleware/loginValidator");

router.post("/login", validations, loginController.loginUser);

module.exports = router;