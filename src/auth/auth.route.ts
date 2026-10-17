import { Router } from "express";
import * as authController from "./auth.controller.js";

const router: Router = Router();

router.post("/login", authController.login);
router.post("/request-otp", authController.requestOtp);
router.post("/verify-otp", authController.verifyOtp);
router.post("/complete-signup", authController.completeSignup);
// add more auth routes here as needed


export default router;