import type { Request, Response, NextFunction } from "express";
import type { Express } from "express";
import { rm } from "node:fs/promises";
import * as dataService from "./data.service.js";

/**
 * Process request-uploaded dataset files and return validation or processing results.
 *
 * @param req Express request containing Multer-uploaded files.
 * @param res Express response used for the structured JSON payload.
 * @param next Express error-forwarding callback for unexpected failures.
 * @returns A promise that resolves after the response lifecycle completes.
 */
export async function processUploadData(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Keep uploaded temporary files isolated to this request, then clean them
  // whether processing succeeds, returns validation errors, or throws.
  let cleanup: (() => Promise<void>) | undefined;
  try {
    const files = req.files as Express.Multer.File[] | undefined;
    const processed = await dataService.processUploadedDataset(files ?? []);
    cleanup = processed.cleanup;
    const hasErrors = processed.result.errors.length > 0;
    res.status(hasErrors ? 422 : 202).json({
      success: !hasErrors,
      message: hasErrors ? processed.result.errors[0]?.message ?? "Dataset validation failed." : "Dataset processed successfully.",
      data: processed.result,
    });
  } catch (error) {
    const uploadedFiles = req.files as Express.Multer.File[] | undefined;
    await Promise.all((uploadedFiles ?? []).map((file) => rm(file.path, { force: true })));
    if (error instanceof Error && "status" in error && typeof error.status === "number") {
      res.status(error.status).json({ success: false, message: error.message });
      return;
    }
    if (error instanceof Error && error.message.includes("File too large")) {
      res.status(413).json({ success: false, message: "The uploaded dataset exceeds the 15 GB limit." });
      return;
    }
    next(error);
  } finally {
    await cleanup?.();
  }
}