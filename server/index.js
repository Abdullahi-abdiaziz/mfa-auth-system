import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "passport";

import connectDb from "./config/db.config.js";
import authRoutes from "./routes/auth.routes.js";
import mfaRoutes from "./routes/mfa.routes.js";
dotenv.config();

connectDb();
const app = express();

const corsOptions = {
  origin: "http://localhost:3001",
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: "true" }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/test", (req, res) => {
  res.send("hello world");
});
app.use("/api/auth", authRoutes);
app.use("/api/auth/mfa", mfaRoutes);

const PORT = process.env.PORT || 7002;

// Listen app
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
