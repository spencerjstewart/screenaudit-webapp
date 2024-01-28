const bcrypt = require("bcrypt");
const User = require("../models").User;

exports.registerUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    res.redirect("/login");
  } catch (error) {
    res.status(500).send("Error occurred during registration");
  }
};