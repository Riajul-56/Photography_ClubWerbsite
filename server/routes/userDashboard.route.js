import express from "express";
import { getUserDashboard } from "../controllers/userDashboard.controller.js";

const router = express.Router();

router.get("/dashboard", getUserDashboard);

export default router;
