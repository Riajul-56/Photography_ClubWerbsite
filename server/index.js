// server/index.js
import express from "express";
import cors from "cors";
import adminDashboardRoutes from "./routes/adminDashboard.js";
import photoRoutes from "./routes/photoRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/admin", adminDashboardRoutes);
app.use("/api/photos", photoRoutes);

app.listen(5000, () => console.log("Server is running on port 5000"));
