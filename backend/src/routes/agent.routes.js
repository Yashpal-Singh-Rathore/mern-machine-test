import express from "express";
import { createAgent } from "../controllers/agent.controller.js";
import protect from "../middlewares/auth.middleware.js";
import adminOnly from "../middlewares/admin.middleware.js";

const router = express.Router();

// POST/api/agents
router.post("/", protect, adminOnly, createAgent);

export default router;
