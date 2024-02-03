const { body } = require("express-validator");

const validations = [
  body("email", "Invalid email address").isEmail().normalizeEmail(),
  body("password", "Password cannot be empty").not().isEmpty(),
];

module.exports = validations;