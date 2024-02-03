const jwt = require("jsonwebtoken");

async function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err || !decoded || !decoded.id) {
      return res.sendStatus(403);
    } else {
      req.user = { id: decoded.id, ...decoded };
    }
    next();
  });
}

module.exports = authenticateToken;