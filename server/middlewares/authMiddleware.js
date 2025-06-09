const jwt = require("jsonwebtoken");
const User = require("../models/User");

const SECRET_KEY = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Token not provided" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, SECRET_KEY, async (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res
            .status(401)
            .json({ success: false, message: "Token expired" });
        }
        return res
          .status(401)
          .json({ success: false, message: "Invalid token" });
      }

      // Optional: If you want to fetch full user from DB
      // const user = await User.findById(decoded.id);
      // if (!user) {
      //   return res.status(404).json({ success: false, message: "User not found" });
      // }

      req.user = decoded; // or req.user = user;
      next();
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unauthorized: Invalid or expired token",
      error: error.message,
    });
  }
};

module.exports = authMiddleware;
