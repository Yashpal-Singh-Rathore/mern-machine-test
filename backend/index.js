import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import cors from "cors";
import indexRoutes from "./src/routes/index.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import agentRoutes from "./src/routes/agent.routes.js";
import uploadRoutes from "./src/routes/upload.routes.js";

import AppError from "./src/utils/AppError.js";
import errorMiddleware from "./src/middlewares/error.middleware.js";

dotenv.config();

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

//  Read frontend URL from environment
const allowedOrigin = process.env.FRONTEND_URL;

// Middleware
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  }),
);

app.use(express.json());

// Routes
app.use("/", indexRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api", uploadRoutes);

// 404 handler (If no route matched)
app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

// Global Error Middleware (must be at bottom after all routes)
app.use(errorMiddleware);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
