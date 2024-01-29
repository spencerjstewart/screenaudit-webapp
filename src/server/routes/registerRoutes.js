const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");
const {
  validations,
  handleValidationErrors,
} = require("../middleware/registrationValidator");

router.post(
  "/register",
  validations,
  handleValidationErrors,
  registerController.registerUser,
);

module.exports = router;