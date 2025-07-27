// In your admin.routes.js file
import express from "express";
import bcrypt from "bcryptjs"; // bcryptjs for password hashing
import db from "../config/db.js"; // your MySQL connection

const router = express.Router();

// POST route to add a new admin
router.post("/add-admin", async (req, res) => {
  const { username, email, password } = req.body;

  // Check if all fields are present
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // SQL query to insert the new admin
    const query =
      "INSERT INTO admin (username, email, password, is_active) VALUES (?, ?, ?, ?)";

    // Execute the query
    await db.execute(query, [username, email, hashedPassword, 1]);

    return res.status(201).json({ message: "Admin added successfully" });
  } catch (error) {
    console.error("Error inserting admin:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
