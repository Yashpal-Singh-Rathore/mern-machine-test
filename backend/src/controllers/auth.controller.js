import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email an password required" });
    }

    // find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // compare password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
