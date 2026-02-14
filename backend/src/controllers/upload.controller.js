import csv from "csv-parser";
import xlsx from "xlsx";
import Task from "../models/task.model.js";
import User from "../models/user.model.js";

export const uploadAndDistribute = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    // 1. Fetch agents
    const agents = await User.find({ role: "agent" });

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

    res.status(200).json({
      message: "File uploaded and tasks distributed successfully",
      totalTasks: tasksToInsert.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
