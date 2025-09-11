import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import errorHandler from "../middleware/errorHandler.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import { createBookingValidation, createBookingAdminValidation } from "../middleware/validation.middleware.js";
import { createBooking, createBookingAdmin, getBookings, confirmBooking, deleteBooking } from "../controllers/bookings.controller.js";

const router = new Router();

router.get("/", authMiddleware, roleMiddleware, getBookings);
router.post("/", authMiddleware, createBookingValidation, errorHandler, createBooking);
router.post("/admin", authMiddleware, roleMiddleware, createBookingAdminValidation, errorHandler, createBookingAdmin);
router.patch("/confirm/:id", authMiddleware, roleMiddleware, confirmBooking);
router.delete("/admin/:id", authMiddleware, roleMiddleware, deleteBooking);
router.delete("/user/:id", authMiddleware, deleteBooking);

export default router;