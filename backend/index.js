import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.status(200).send("Backend is running");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
