const jwt = require("jsonwebtoken");

exports.authorize = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(400).send({ message: "Token not found | Access denied" });
  jwt.verify(token, process.env.JWT_SECRET, (err, validToken) => {
    if (err) {
      return res.status(400).send({ message: "invalid token" });
    } else {
      req.user = validToken;
      next();
    }
  });
};
