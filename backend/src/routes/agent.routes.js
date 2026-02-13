import express from "express";
import { createAgent, getAgents } from "../controllers/agent.controller.js";
import protect from "../middlewares/auth.middleware.js";
import adminOnly from "../middlewares/admin.middleware.js";

const router = express.Router();

// GET /api/agents
router.get("/", protect, adminOnly, getAgents);

// POST /api/agents
router.post("/", protect, adminOnly, createAgent);

export default router;
