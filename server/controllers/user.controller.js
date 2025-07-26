import db from "../config/db.js";

export const getUserDashboard = async (req, res) => {
  try {
    const [uploads] = await db.execute(
      "SELECT title, uploaded_at FROM photos ORDER BY uploaded_at DESC LIMIT 5"
    );
    const [comments] = await db.execute(
      "SELECT message, created_at FROM comments ORDER BY created_at DESC LIMIT 5"
    );
    const [likes] = await db.execute(
      "SELECT photo_id, created_at FROM likes ORDER BY created_at DESC LIMIT 5"
    );
    const [notifications] = await db.execute(
      "SELECT message FROM notifications ORDER BY created_at DESC LIMIT 5"
    );
    const [stats] = await db.execute(
      `SELECT 
        (SELECT COUNT(*) FROM photos) AS totalPhotos, 
        (SELECT COUNT(*) FROM followers) AS followers, 
        (SELECT COUNT(*) FROM achievements) AS achievements`
    );
    const [events] = await db.execute(
      "SELECT name, event_date FROM events WHERE event_date >= CURDATE() ORDER BY event_date ASC LIMIT 3"
    );

    const activityFeed = [
      ...uploads.map((u) => ({ type: "Upload", data: u })),
      ...comments.map((c) => ({ type: "Comment", data: c })),
      ...likes.map((l) => ({ type: "Like", data: l })),
    ].sort(
      (a, b) =>
        new Date(b.data.uploaded_at || b.data.created_at) -
        new Date(a.data.uploaded_at || a.data.created_at)
    );

    res.json({
      activityFeed: activityFeed.slice(0, 10),
      notifications,
      quickStats: stats[0],
      upcomingEvents: events,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
