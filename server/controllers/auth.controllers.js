import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import "../config/passport.config.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isMfaActive: false,
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

export const login = async (req, res) => {
  return res.status(200).json({
    message: "Login successful",
    email: req.user.email,
    isMfaActive: req.user.isMfaActive,
  });
};

export const logout = async (req, res) => {
  res.json({ message: "Logout successful" });
};

export const status = async (req, res) => {
  res.json({ message: "API is running" });
};
