import { Router } from "express";
import * as userController from "./user.controller.js";
import { authenticate } from "../../middleware/authenticate.js";

const router: Router = Router();

// All routes registered below this line require authentication.
router.use(authenticate);

// Only authenticated users can access this endpoint.
router.get("/me", userController.getMe);

export default router;