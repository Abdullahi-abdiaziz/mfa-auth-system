import { Router } from "express";
import {
  setupMfa,
  verifyMfa,
  resetMfa,
} from "../controllers/mfa.controllers.js";

const router = new Router();

router.post("/setup", setupMfa);
router.get("/verify", verifyMfa);
router.post("/reset", resetMfa);

export default router;
