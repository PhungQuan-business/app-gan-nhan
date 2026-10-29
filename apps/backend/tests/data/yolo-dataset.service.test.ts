import { mkdtemp, rm, writeFile, mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import type { Express } from "express";
import { parseFilename, processUploadedDataset } from "../../src/data/data.service.js";

describe("parseFilename", () => {
  it("extracts patient, date, and Roboflow angle metadata", () => {
    expect(parseFilename("Patient_0001_28-10-2025_Top-left_JPG.rf.75fb.jpg")).toEqual({
      patientProfile: "Patient_0001",
      collectionDate: "28-10-2025",
      angle: "Top-left",
    });
  });

  it.each([
    "Top-left", "Top-middle", "Top-right",
    "Central-left", "Central-middle", "Central-right",
    "Bottom-left", "Bottom-middle", "Bottom-right",
  ])("accepts the supported %s angle", (angle) => {
    expect(parseFilename(`Patient_0001_28-10-2025_${angle}_JPG.rf.75fb.jpg`)?.angle).toBe(angle);
  });

  it("rejects impossible collection dates", () => {
    expect(parseFilename("Patient_0001_31-02-2025_Top-left_JPG.rf.75fb.jpg")).toBeNull();
  });

  it("rejects malformed filenames instead of guessing metadata", () => {
    expect(parseFilename("random-photo.jpg")).toBeNull();
  });
});

describe("processUploadedDataset", () => {
  it("processes a folder upload without using a server fixture", async () => {
    const sourceRoot = await mkdtemp(join(tmpdir(), "gan-nhan-fixture-"));
    const trainRoot = join(sourceRoot, "dataset", "train");
    await mkdir(trainRoot, { recursive: true });
    const files = ["data.yaml", "train/Patient_0001_28-10-2025_Top-left_JPG.rf.75fb.jpg", "train/Patient_0001_28-10-2025_Top-left_JPG.rf.75fb.txt"];
    await writeFile(join(sourceRoot, "dataset", "data.yaml"), "names:\n  0: lesion\ntrain: train\n");
    await writeFile(join(trainRoot, "Patient_0001_28-10-2025_Top-left_JPG.rf.75fb.jpg"), "image bytes");
    await writeFile(join(trainRoot, "Patient_0001_28-10-2025_Top-left_JPG.rf.75fb.txt"), "0 0.5 0.5 0.2 0.2\n");

    const uploads = files.map((relativePath) => {
      const sourcePath = join(sourceRoot, "dataset", ...relativePath.split("/"));
      return { originalname: `dataset/${relativePath}`, path: sourcePath } as Express.Multer.File;
    });

    const processed = await processUploadedDataset(uploads);
    try {
      expect(processed.result.classes).toEqual(["lesion"]);
      expect(processed.result.images).toHaveLength(1);
      expect(processed.result.collectionSessions[0]).toEqual({ patientProfile: "Patient_0001", collectionDate: "28-10-2025", imageCount: 1 });
      expect(processed.result.errors).toEqual([]);
    } finally {
      await processed.cleanup();
      await rm(sourceRoot, { recursive: true, force: true });
    }
  });
});
