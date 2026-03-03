import User from "../models/user.model.js";
import Task from "../models/task.model.js";
import AppError from "../utils/AppError.js";

export const createAgent = async (req, res) => {
  const { name, email, password, mobile } = req.body;

  // 1. Validation
  if (!name || !email || !password || !mobile) {
    throw new AppError("All fields are required", 400);
  }

  // 2. Check if agent already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("Agent already exists", 409);
  }

  // 3. Create agent
  const agent = await User.create({
    name,
    email,
    password,
    role: "agent",
    mobile,
  });

  res.status(201).json({
    message: "Agent created successfully",
    agent: {
      id: agent._id,
      name: agent.name,
      email: agent.email,
      mobile: agent.mobile,
      role: agent.role,
    },
  });
};

export const getAgents = async (req, res) => {
  const agents = await User.find({ role: "agent" }).select("-password");

  res.status(200).json(agents);
};

export const getAgentTask = async (req, res) => {
  const { id } = req.params;

  // check if agent exists
  const agent = await User.findById(id);
  if (!agent || agent.role !== "agent") {
    throw new AppError("Agent not found", 404);
  }

  // Fetch tasks assigned to this agent
  const tasks = await Task.find({ assignedTo: id });

  res.status(200).json(tasks);
};
