import { Router } from "express";
import {
  register,
  login,
  logout,
  status,
} from "../controllers/auth.controllers.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/status", status);

export default router;
