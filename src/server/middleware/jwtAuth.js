const jwt = require("jsonwebtoken");
const { User } = require("../models");

async function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.sendStatus(403);

    try {
      const user = await User.findByPk(decoded.id);
      if (!user) return res.sendStatus(404);

      req.user = user;
      next();
    } catch (error) {
      return res.sendStatus(500);
    }
  });
}

module.exports = authenticateToken;