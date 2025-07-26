// server/routes/user.js
import express from "express";
import db from "../db.js";

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

export default router;
