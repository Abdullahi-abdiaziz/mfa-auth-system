import { Router } from "express";
import {
  setupMfa,
  verifyMfa,
  resetMfa,
  verifyIsAuthenticated,
} from "../controllers/mfa.controllers.js";

const router = new Router();

router.post("/setup", verifyIsAuthenticated, setupMfa);
router.post("/verify", verifyIsAuthenticated, verifyMfa);
router.post("/reset", verifyIsAuthenticated, resetMfa);

export default router;
