import db from "../config/db.js"; // তোমার MySQL connection ফাইল

export const getAdminDashboardData = async (req, res) => {
  try {
    // System health (dummy for now)
    const systemHealth = {
      cpuUsage: "12%",
      memoryUsage: "65%",
      diskSpace: "75%",
      uptime: "3 days 4 hrs",
    };

    // Activity metrics (example queries)
    const [[{ activeUsers }]] = await db.query(
      "SELECT COUNT(*) as activeUsers FROM users WHERE status = 'active'"
    );
    const [[{ uploadsLastHour }]] = await db.query(
      "SELECT COUNT(*) as uploadsLastHour FROM photos WHERE created_at >= NOW() - INTERVAL 1 HOUR"
    );
    const [[{ commentsLastHour }]] = await db.query(
      "SELECT COUNT(*) as commentsLastHour FROM comments WHERE created_at >= NOW() - INTERVAL 1 HOUR"
    );

    const activityMetrics = { activeUsers, uploadsLastHour, commentsLastHour };

    // Recent registrations
    const [recentRegistrations] = await db.query(
      "SELECT id, name, created_at as registeredAt FROM users ORDER BY created_at DESC LIMIT 5"
    );

    // Content queue
    const [contentQueue] = await db.query(
      "SELECT id, title, status FROM content_queue ORDER BY created_at DESC LIMIT 10"
    );

    // KPIs
    const [[{ totalUsers }]] = await db.query(
      "SELECT COUNT(*) as totalUsers FROM users"
    );
    const [[{ totalPhotos }]] = await db.query(
      "SELECT COUNT(*) as totalPhotos FROM photos"
    );
    const [[{ averageLikesPerPhoto }]] = await db.query(
      "SELECT IFNULL(AVG(likes), 0) as averageLikesPerPhoto FROM photos"
    );
    const [[{ revenueThisMonth }]] = await db.query(
      "SELECT IFNULL(SUM(amount), 0) as revenueThisMonth FROM payments WHERE MONTH(created_at) = MONTH(CURDATE())"
    );

    const keyPerformanceIndicators = {
      totalUsers,
      totalPhotos,
      averageLikesPerPhoto,
      revenueThisMonth: `$${revenueThisMonth}`,
    };

    // Send all combined data
    return res.status(200).json({
      systemHealth,
      activityMetrics,
      recentRegistrations,
      contentQueue,
      keyPerformanceIndicators,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};
