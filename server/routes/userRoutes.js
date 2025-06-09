const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  verifyUser,
} = require("../controllers/userController.js");

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/verify-token", verifyUser);

module.exports = router;
