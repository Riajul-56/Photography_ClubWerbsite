// server/routes/photoRoutes.js
import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/photos", async (req, res) => {
  try {
    const [photos] = await db.query(
      "SELECT * FROM photos ORDER BY created_at DESC"
    );
    res.json(photos);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch photos" });
  }
});

export default router;
