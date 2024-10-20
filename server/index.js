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

// Load environment variables from .env file

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 200,
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
      maxAge: 60 * 60 * 1000, // 1 year in milliseconds
      httpOnly: true, // HttpOnly cookies can't be accessed by client-side JavaScript
      secure: false, // Set to true in production environment to enable HTTPS cookie secure flag
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
