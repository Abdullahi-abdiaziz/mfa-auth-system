import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import "../config/passport.config.js";
import passport from "passport";

export const register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email, username });

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    if (confirmPassword !== password) {
      return res
        .status(400)
        .json({ success: false, message: "check your password" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      isMfaActive: false,
    });
    await newUser.save();

    // Send a structured response including the success message
    return res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(500).json({
        success: false,
        message: "User is already registered, try to login",
        error: error.message,
      });
    }
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const login = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Server error. Please try again." });
    }
    if (!user) {
      return res.status(400).json({ message: info.message }); // Invalid credentials
    }
    req.logIn(user, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Login failed. Please try again." });
      }

      user = {
        id: user._id,
        username: user.username,
        email: user.email,
        isMfaActive: user.isMfaActive,
      };

      return res.status(200).json({ message: "Login successful", user });
    });
  })(req, res, next);
};

export const logout = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized User" });
  req.logout((err) => {
    if (err) return res.status(400).json({ message: "User not logged in" });
    res.status(200).json({ message: "User logged out" });
  });
};

export const status = async (req, res) => {
  if (req.user) {
    return res.status(200).json({
      message: "User is logged in",
      email: req.user.email,
      username: req.user.username,
      isMfaActive: req.user.isMfaActive,
    });
  } else {
    return res.status(401).json({ message: "Unauthorized User" });
  }
};
