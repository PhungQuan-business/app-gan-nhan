import { Router } from "express";
import multer from "multer";
import { join } from "node:path";
import { tmpdir } from "node:os";
import * as dataController from "./data.controller.js";

const upload = multer({
  dest: join(tmpdir(), "app-gan-nhan-uploads"),
  limits: { fileSize: 15_000_000_000, files: 50_000 },
});

const router: Router = Router();

// router.post("/login", authController.login);
// router.post("/request-otp", authController.verifyEmail, authController.requestOtp);
// router.post("/verify-otp", authController.verifyOtp);
// router.post("/complete-signup", authController.completeSignup);
// add more auth routes here as needed

// Upload data
router.post("/dataset-upload", (req, res, next) => {
  upload.array("files", 50_000)(req, res, (error) => {
    if (!error) {
      next();
      return;
    }
    if (error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE") {
      res.status(413).json({ success: false, message: "The uploaded dataset exceeds the 15 GB limit." });
      return;
    }
    res.status(400).json({ success: false, message: error instanceof Error ? error.message : "Invalid multipart upload." });
  });
}, dataController.processUploadData)

// Get patient profile by uploadId (GET)

// Confirm profile creation





export default router;