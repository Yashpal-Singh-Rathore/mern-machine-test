import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import indexRoutes from "./src/routes/index.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// connect to database
connectDB();

// mount routes
app.use("/", indexRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
