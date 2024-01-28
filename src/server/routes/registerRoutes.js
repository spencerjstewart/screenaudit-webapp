const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");
const validateRegistration = require("../middleware/registrationValidator");

router.post("/register", validateRegistration, registerController.registerUser);

module.exports = router;