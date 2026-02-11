import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import cors from "cors";
import indexRoutes from "./src/routes/index.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import agentRoutes from "./src/routes/agent.routes.js";
import uploadRoutes from "./src/routes/upload.routes.js";

dotenv.config();
// connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

// middleware
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);
app.use(express.json());

// mount routes
app.use("/", indexRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api", uploadRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
