import { Router } from "express";
import { getUserProfile, getUserBookings } from '../controllers/users.controller.js';
import authMiddleware from "../middleware/auth.middleware.js";

const router = new Router();

router.get("/profile", authMiddleware, getUserProfile);
router.get("/bookings", authMiddleware, getUserBookings);

export default router;