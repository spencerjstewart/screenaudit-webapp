const { validationResult } = require("express-validator");

const { body } = require("express-validator");
const { User } = require("../models/users");

const validations = [
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

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validations, handleValidationErrors };