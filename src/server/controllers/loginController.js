const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Attempt to find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(401)
        .json({ message: "The email entered was not found." });
    }

    // Compare provided password with hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password." });
    }

    // Generate JWT for the user
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000,
    });

    res.redirect("/dashboard");
  } catch (error) {
    // Handle unexpected server errors
    res.status(500).json({ message: "Server error", error });
  }
};

exports.loginPage = (req, res) => {
  res.render("login");
};