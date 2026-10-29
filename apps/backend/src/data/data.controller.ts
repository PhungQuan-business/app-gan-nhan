import type { Request, Response, NextFunction } from "express";
import type { Express } from "express";
import { rm } from "node:fs/promises";
import * as dataService from "./data.service.js";

export async function processUploadData(
  req: Request,
  res: Response,
  next: NextFunction,
) {
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