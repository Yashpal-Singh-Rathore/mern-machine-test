import express from "express";
import dotenv from "dotenv";
import indexRoutes from "./src/routes/index.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// mount routes
app.use("/", indexRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
