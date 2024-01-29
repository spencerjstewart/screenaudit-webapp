const { validationResult } = require("express-validator");

const { body } = require("express-validator");
const { User } = require("../models");

const validations = [
  body("email", "Invalid email")
    .trim()
    .escape()
    .isEmail()
    .custom(async (email) => {
      const existingUser = await User.findOne({ where: { email: email } });
      if (existingUser) {
        throw new Error("EmailAlreadyExists");
      }
    }),
  body("password", "Password must be at least 8 characters long")
    .trim()
    .isLength({ min: 8 }),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (errors.array().some((error) => error.msg === "EmailAlreadyExists")) {
      return res.status(409).send("Email already exists");
    } else {
      const concatenatedMessages = errors.array().reduce((acc, error) => {
        return acc + (acc ? " " : "") + error.msg;
      }, "");
      return res.status(400).send(concatenatedMessages);
    }
  }
  next();
};

module.exports = { validations, handleValidationErrors };