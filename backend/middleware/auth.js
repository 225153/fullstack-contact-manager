const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).send({ msg: "Access denied. No token provided." });
  }
  const parts = authHeader.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).send({ msg: "Invalid Authorization format" });
  }

  const token = parts[1];
  if (!token) {
    return res.status(401).send({ msg: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, "hedhasecretkey");
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).send({ msg: "Invalid token." });
  }
};
module.exports = auth;
