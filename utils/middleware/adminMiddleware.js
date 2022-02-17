const jwt = require("jsonwebtoken");

exports.adminAuth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(400).send("Access denied, no token provided.");

  jwt.verify(token, process.env.JWT_SECRET, (err, validToken) => {
    if (err) {
      return res.status(400).send({ message: "invalid token" });
    } else {
      if (!validToken.isAdmin)
        return res.status(403).send({
          message: "Sorry you do not have permission to perform this task",
        });

      req.user = validToken;
      next();
    }
  });
};
