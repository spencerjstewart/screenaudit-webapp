// middleware/registrationValidator.js
const { body } = require("express-validator");
const { User } = require("../models");

const validateRegistration = [
  body("email", "Invalid email")
    .trim()
    .escape()
    .isEmail()
    .custom(async (email) => {
      const existingUser = await User.findOne({ where: { email: email } });
      if (existingUser) {
        throw new Error("User already exists with this email");
      }
    }),
  body("password", "Password must be at least 8 characters long")
    .trim()
    .isLength({ min: 8 }),
];

module.exports = validateRegistration;