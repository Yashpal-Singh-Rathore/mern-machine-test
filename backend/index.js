import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import indexRoutes from "./src/routes/index.routes.js";
import authRoutes from "./src/routes/auth.routes.js";

dotenv.config();
// connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

// middleware
app.use(express.json());

// mount routes
app.use("/", indexRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
