import { Router } from "express";
import { addRoom, getRoom, getRooms, findRooms, editRoom, deleteRoom } from "../controllers/rooms.controller.js";
import { createRoomValidation, editRoomValidation, findRoomsValidation } from "../middleware/validation.middleware.js";
import errorHandler from "../middleware/errorHandler.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import { createUploadMiddleware } from "../middleware/upload.middleware.js";

const router = new Router();

router.get("/", getRooms);
router.get("/find", findRoomsValidation, errorHandler, findRooms);
router.get("/:id", getRoom);
router.post("/", authMiddleware, roleMiddleware,  createUploadMiddleware("files", true), createRoomValidation, errorHandler, addRoom);
router.patch("/:id", authMiddleware, roleMiddleware, createUploadMiddleware("files"), editRoomValidation, errorHandler, editRoom);
router.delete("/:id", authMiddleware, roleMiddleware, deleteRoom);

export default router;