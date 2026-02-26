import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return next(new AppError("Email and password required", 400));
    }

    // find user
    const user = await User.findOne({ email });

    if (!user) {
      return next(new AppError("Invalid credentials", 401));
    }

    // compare password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new AppError("Invalid credentials", 401));
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
    next(error);
  }
};
