import express from "express";
import db from "../config/db.js";
import { getUserDashboard } from "../controllers/user.controller.js"; // ✅ import it

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email } = req.body;
  try {
    await db.query("INSERT INTO users (name, email) VALUES (?, ?)", [
      name,
      email,
    ]);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ ADD THIS ROUTE
router.get("/dashboard", getUserDashboard);

export default router;
