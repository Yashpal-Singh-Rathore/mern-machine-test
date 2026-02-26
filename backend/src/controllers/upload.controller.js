import csv from "csv-parser";
import xlsx from "xlsx";
import Task from "../models/task.model.js";
import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";

export const uploadAndDistribute = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new AppError("File is required", 400));
    }

    // 1. Fetch agents
    const agents = await User.find({ role: "agent" });

    if (!agents.length) {
      return next(new AppError("No agents available", 400));
    }

    let records = [];

    // 2. Parse file
    if (req.file.originalname.endsWith(".csv")) {
      const rows = req.file.buffer.toString("utf8").split("\n");

      for (let i = 1; i < rows.length; i++) {
        const [firstName, phone, notes] = rows[i].split(",");
        if (firstName && phone) {
          records.push({ firstName, phone, notes });
        }
      }
    } else {
      const workbook = xlsx.read(req.file.buffer);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      records = xlsx.utils.sheet_to_json(sheet);
    }

    // 3. Distribute
    const tasksToInsert = records.map((record, index) => ({
      ...record,
      assignedTo: agents[index % agents.length]._id,
    }));

    // 4. Save to DB
    await Task.insertMany(tasksToInsert);

    return res.status(200).json({
      message: "File uploaded and tasks distributed successfully",
      totalTasks: tasksToInsert.length,
    });
  } catch (error) {
    // Handle duplicate key error specifically
    if (error.code === 11000) {
      return next(
        new AppError(
          "Duplicate phone number detected. Some tasks already exist.",
          409,
        ),
      );
    }

    // Generic fallback
    next(error);
  }
};
