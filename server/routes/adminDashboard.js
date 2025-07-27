// import express from "express";
// import db from "../config/db.js"; 

// const router = express.Router();

// router.get("/dashboard", async (req, res) => {
//   try {
//     // Recent 5 users
//     const [recentUsers] = await db.query(
//       "SELECT id, name, email, registered_at FROM users ORDER BY registered_at DESC LIMIT 5"
//     );

//     // Real-time Activity Metrics
//     const [uploadsLastHour] = await db.query(`
//       SELECT COUNT(*) AS count FROM photos 
//       WHERE created_at >= NOW() - INTERVAL 1 HOUR
//     `);

//     const [commentsLastHour] = await db.query(`
//       SELECT SUM(comments_count) AS count FROM photos 
//       WHERE created_at >= NOW() - INTERVAL 1 HOUR
//     `);

//     const [activeUsers] = await db.query(`
//       SELECT COUNT(DISTINCT user_id) AS count FROM photos 
//       WHERE created_at >= NOW() - INTERVAL 1 HOUR
//     `);

//     // Content Queue
//     const [contentQueue] = await db.query(`
//       SELECT id, title, status FROM content_queue ORDER BY submitted_at DESC LIMIT 5
//     `);

//     // KPIs
//     const [userCount] = await db.query(
//       `SELECT COUNT(*) AS totalUsers FROM users`
//     );
//     const [photoCount] = await db.query(
//       `SELECT COUNT(*) AS totalPhotos FROM photos`
//     );
//     const [avgLikes] = await db.query(
//       `SELECT AVG(likes) AS avgLikes FROM photos`
//     );

//     const systemHealth = {
//       cpuUsage: "45%",
//       memoryUsage: "65%",
//       diskSpace: "180GB free of 500GB",
//       uptime: "10 days",
//     };

//     const activityMetrics = {
//       activeUsers: activeUsers[0].count || 0,
//       uploadsLastHour: uploadsLastHour[0].count || 0,
//       commentsLastHour: commentsLastHour[0].count || 0,
//     };

//     const keyPerformanceIndicators = {
//       totalUsers: userCount[0].totalUsers,
//       totalPhotos: photoCount[0].totalPhotos,
//       averageLikesPerPhoto: Math.round(avgLikes[0].avgLikes || 0),
//       revenueThisMonth: "$10,000", // static for now
//     };

//     res.json({
//       systemHealth,
//       activityMetrics,
//       recentRegistrations: recentUsers,
//       contentQueue,
//       keyPerformanceIndicators,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Dashboard fetch failed" });
//   }
// });

// export default router;


import express from "express";
import db from "../config/db.js"; // your MySQL connection
import bcrypt from "bcrypt"; // To hash the password before storing it
const router = express.Router();

// POST route to add a new admin
router.post("/add-admin", async (req, res) => {
  const { username, email, password, role = "super_admin" } = req.body; // Default role is 'super_admin'

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // SQL query to insert the new admin into the 'admin' table
    const query = `
      INSERT INTO admin (username, email, password, role, is_active)
      VALUES (?, ?, ?, ?, ?)
    `;

    // Execute the query
    await db.execute(query, [username, email, hashedPassword, role, true]);

    return res.status(201).json({ message: "Admin added successfully" });
  } catch (error) {
    console.error("Error inserting admin:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;

