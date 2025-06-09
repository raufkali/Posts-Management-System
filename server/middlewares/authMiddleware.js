const jwt = require("jsonwebtoken");
const User = require("../models/User");

const SECRET_KEY = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(400)
        .json({ success: false, message: "Token not provided" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err && err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ success: false, message: "Token expired" });
      }

      if (err) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid token" });
      }

      return res.status(200).json({ success: true, message: "Token is valid" });
    });
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired token",
      error: error.message,
    });
  }
};

module.exports = authMiddleware;
