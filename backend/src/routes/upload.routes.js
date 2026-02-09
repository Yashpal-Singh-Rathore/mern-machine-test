import express from "express";
import upload from "../middlewares/upload.middleware.js";
import protect from "../middlewares/auth.middleware.js";
import adminOnly from "../middlewares/admin.middleware.js";
import { uploadAndDistribute } from "../controllers/upload.controller.js";

const router = express.Router();

router.post(
  "/upload",
  protect,
  adminOnly,
  upload.single("file"),
  uploadAndDistribute,
);

export default router;
