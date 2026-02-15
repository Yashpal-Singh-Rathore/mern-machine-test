import express from "express";
import {
  createAgent,
  getAgents,
  getAgentTask,
} from "../controllers/agent.controller.js";
import protect from "../middlewares/auth.middleware.js";
import adminOnly from "../middlewares/admin.middleware.js";

const router = express.Router();

// GET /api/agents
router.get("/", protect, adminOnly, getAgents);

// GET /api/agents/:id/tasks
router.get("/:id/tasks", protect, adminOnly, getAgentTask);

// POST /api/agents
router.post("/", protect, adminOnly, createAgent);

export default router;
