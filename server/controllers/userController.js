const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const sendError = (message, status, next) => {
  const err = new Error(message);
  err.status = status;
  next(err);
};

// Login user
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const exists = await User.findOne({ email });
    if (!exists) {
      return sendError("This email is not registered!", 404, next);
    }

    const isValid = await bcrypt.compare(password, exists.password);
    if (!isValid) {
      return sendError("Password is incorrect for this email!", 401, next);
    }

    const token = jwt.sign(
      { userId: exists._id, email: exists.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const { password: _, ...userWithoutPassword } = exists._doc;

    res.status(200).json({
      message: "Login successful",
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    next(error);
  }
};

// Register a new user
const registerUser = async (req, res, next) => {
  try {
    const { fullname, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return sendError("Email already in use", 409, next);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    if (!user) {
      return sendError("Can't create User", 400, next);
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const { password: _, ...userWithoutPassword } = user._doc;

    res.status(201).json({
      message: "User created successfully",
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginUser,
  registerUser,
};
