import { Router } from "express";
import { signup, signin, sendСode, checkingСode, changePassword, check } from '../controllers/auth.controller.js';
import errorHandler from "../middleware/errorHandler.middleware.js";
import { signInValidation, signUpValidation, sendСodeValidation, checkingСodeValidation, changePasswordValidation } from "../middleware/validation.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = new Router();

router.get("/check", authMiddleware, check);
router.post("/signup", signUpValidation, errorHandler, signup);
router.post("/signin", signInValidation, errorHandler, signin);
router.post("/sendcode", sendСodeValidation, errorHandler, sendСode);
router.post("/checkingcode", checkingСodeValidation, errorHandler, checkingСode);
router.post("/changepassword", changePasswordValidation, errorHandler, changePassword);

export default router;