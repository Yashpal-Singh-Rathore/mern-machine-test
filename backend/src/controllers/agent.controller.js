import User from "../models/user.model.js";

export const createAgent = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;

    // 1. Validation
    if (!name || !email || !password || !mobile) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Check if agent already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Agent already exists" });
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
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
