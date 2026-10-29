import { createReadStream, createWriteStream } from "node:fs";
import { lstat, mkdir, readFile, readdir, rm } from "node:fs/promises";
import { basename, dirname, extname, join, normalize, relative, resolve, sep } from "node:path";
import type { Express } from "express";
import AdmZip from "adm-zip";
import YAML from "yaml";
import { tmpdir } from "node:os";
import { randomUUID } from "node:crypto";

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".bmp", ".webp"]);
const supportedAngles = new Set([
  "Top-left", "Top-middle", "Top-right",
  "Central-left", "Central-middle", "Central-right",
  "Bottom-left", "Bottom-middle", "Bottom-right",
]);

export type DatasetValidation = {
  code: string;
  message: string;
  path?: string;
};

export type ProcessUploadResult = {
  datasetRoot: string;
  config: Record<string, unknown>;
  classes: string[];
  splits: Array<{ name: string; path: string; imageCount: number }>;
  images: Array<{ filename: string; path: string; split: string; patientProfile: string; collectionDate: string; angle: string; annotation: string | null }>;
  collectionSessions: Array<{ patientProfile: string; collectionDate: string; imageCount: number }>;
  warnings: DatasetValidation[];
  errors: DatasetValidation[];
};

function safeRelativePath(value: string): string | null {
  const normalized = normalize(value).replace(/\\/g, "/");
  if (normalized.startsWith("/") || normalized === ".." || normalized.startsWith("../") || normalized.includes("\0")) return null;
  return normalized;
}

async function pathExists(path: string): Promise<boolean> {
  try {
    await lstat(path);
    return true;
  } catch {
    return false;
  }
}

async function listFiles(root: string, current = root): Promise<string[]> {
  const entries = await readdir(current, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = join(current, entry.name);
    if (entry.isDirectory()) files.push(...await listFiles(root, fullPath));
    else if (entry.isFile()) files.push(fullPath);
  }
  return files;
}

export function parseFilename(filename: string): { patientProfile: string; collectionDate: string; angle: string } | null {
  const bareName = basename(filename, extname(filename));
  const anglePattern = Array.from(supportedAngles).map((angle) => angle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  const match = bareName.match(new RegExp(`^(.+)_((?:\\d{2})-(?:\\d{2})-(?:\\d{4}))_(${anglePattern})_JPG\\.rf\\.`));
  if (!match) return null;

  const patientProfile = match[1];
  const collectionDate = match[2];
  const angle = match[3];
  if (!patientProfile || !collectionDate || !angle) return null;
  const dateParts = collectionDate.split("-").map(Number);
  const dayText = dateParts[0];
  const monthText = dateParts[1];
  const yearText = dateParts[2];
  if (dayText === undefined || monthText === undefined || yearText === undefined) return null;
  const date = new Date(Date.UTC(yearText, monthText - 1, dayText));
  if (date.getUTCFullYear() !== yearText || date.getUTCMonth() !== monthText - 1 || date.getUTCDate() !== dayText) return null;

  return { patientProfile, collectionDate, angle };
}

async function prepareUpload(files: Express.Multer.File[]): Promise<{ root: string; cleanup: () => Promise<void> }> {
  const root = join(tmpdir(), `gan-nhan-dataset-${randomUUID()}`);
  await mkdir(root, { recursive: true });

  try {
    const zipFiles = files.filter((file) => /\.(zip)$/i.test(file.originalname));
    if (zipFiles.length > 1) throw Object.assign(new Error("Only one dataset ZIP archive may be uploaded."), { status: 400 });

    for (const file of files.filter((item) => !/\.(zip)$/i.test(item.originalname))) {
      const relativePath = safeRelativePath(file.originalname);
      if (!relativePath) throw Object.assign(new Error(`Unsafe upload path: ${file.originalname}`), { status: 400 });
      const destination = resolve(root, relativePath);
      if (destination !== root && !destination.startsWith(`${root}${sep}`)) throw Object.assign(new Error(`Unsafe upload path: ${file.originalname}`), { status: 400 });
      await mkdir(dirname(destination), { recursive: true });
      await new Promise<void>((resolveCopy, rejectCopy) => {
        const source = createReadStream(file.path);
        const target = createWriteStream(destination);
        source.on("error", rejectCopy);
        target.on("error", rejectCopy);
        target.on("finish", resolveCopy);
        source.pipe(target);
      });
      await rm(file.path, { force: true });
    }

    if (zipFiles.length === 1) {
      const zipFile = zipFiles[0];
      if (!zipFile) throw Object.assign(new Error("Dataset ZIP archive was not found."), { status: 400 });
      const zip = new AdmZip(zipFile.path);
      const entries = zip.getEntries();
      let uncompressedSize = 0;
      for (const entry of entries) {
        uncompressedSize += entry.header.size;
        const entryName = safeRelativePath(entry.entryName);
        if (!entryName) throw Object.assign(new Error(`Unsafe archive path: ${entry.entryName}`), { status: 400 });
        if (uncompressedSize > 15_000_000_000) throw Object.assign(new Error("Extracted dataset exceeds the 15 GB limit."), { status: 413 });
      }
      zip.extractAllTo(root, true);
      await rm(zipFile.path, { force: true });
    }

    return { root, cleanup: () => rm(root, { recursive: true, force: true }) };
  } catch (error) {
    await rm(root, { recursive: true, force: true });
    throw error;
  }
}

function findDatasetRoot(files: string[]): string | null {
  const configFiles = files.filter((file) => basename(file).toLowerCase() === "data.yaml");
  if (configFiles.length !== 1) return null;
  const configFile = configFiles[0];
  return configFile ? dirname(configFile) : null;
}

function validateYoloLine(line: string): boolean {
  if (!line.trim()) return true;
  const parts = line.trim().split(/\s+/);
  if (parts.length !== 5) return false;
  const values = parts.map((value) => Number(value));
  if (values.some((value) => !Number.isFinite(value))) return false;
  const classId = values[0];
  const centerX = values[1];
  const centerY = values[2];
  const width = values[3];
  const height = values[4];
  if (classId === undefined || centerX === undefined || centerY === undefined || width === undefined || height === undefined) return false;
  return Number.isInteger(classId) && classId >= 0 && centerX >= 0 && centerX <= 1 && centerY >= 0 && centerY <= 1 && width > 0 && width <= 1 && height > 0 && height <= 1;
}

export async function processUploadedDataset(files: Express.Multer.File[]): Promise<{ result: ProcessUploadResult; cleanup: () => Promise<void> }> {
  if (!files.length) throw Object.assign(new Error("No dataset files were uploaded."), { status: 400 });

  const prepared = await prepareUpload(files);
  const errors: DatasetValidation[] = [];
  const warnings: DatasetValidation[] = [];

  try {
    const allFiles = await listFiles(prepared.root);
    const datasetRoot = findDatasetRoot(allFiles);
    if (!datasetRoot) {
      errors.push({ code: "MISSING_DATA_YAML", message: "Exactly one data.yaml file is required." });
      return { result: { datasetRoot: prepared.root, config: {}, classes: [], splits: [], images: [], collectionSessions: [], warnings, errors }, cleanup: prepared.cleanup };
    }

    const configPath = join(datasetRoot, "data.yaml");
    let config: Record<string, unknown>;
    try {
      const parsed = YAML.parse(await readFile(configPath, "utf8"));
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Root value is not a mapping.");
      config = parsed as Record<string, unknown>;
    } catch (error) {
      errors.push({ code: "INVALID_DATA_YAML", message: `Invalid data.yaml: ${error instanceof Error ? error.message : "Unable to parse YAML"}`, path: relative(prepared.root, configPath) });
      return { result: { datasetRoot: relative(prepared.root, datasetRoot), config: {}, classes: [], splits: [], images: [], collectionSessions: [], warnings, errors }, cleanup: prepared.cleanup };
    }

    const names = config.names ?? config.names;
    const classes = Array.isArray(names) ? names.map(String) : names && typeof names === "object" ? Object.keys(names as Record<string, unknown>).sort((a, b) => Number(a) - Number(b)).map((key) => String((names as Record<string, unknown>)[key])) : [];

    const splitNames = ["train", "valid", "validation", "test"];
    const splits: ProcessUploadResult["splits"] = [];
    const images: ProcessUploadResult["images"] = [];
    const filenames = new Set<string>();

    for (const splitName of splitNames) {
      const splitPath = join(datasetRoot, splitName);
      if (!await pathExists(splitPath)) continue;
      const splitFiles = await listFiles(splitPath);
      const imageFiles = splitFiles.filter((file) => imageExtensions.has(extname(file).toLowerCase()));
      if (!imageFiles.length) continue;
      const normalizedSplit = splitName === "validation" ? "valid" : splitName;
      splits.push({ name: normalizedSplit, path: relative(prepared.root, splitPath).replaceAll("\\", "/"), imageCount: imageFiles.length });

      for (const imagePath of imageFiles) {
        const filename = basename(imagePath);
        if (filenames.has(filename)) {
          errors.push({ code: "DUPLICATE_FILENAME", message: `Duplicate filename rejected: ${filename}`, path: relative(prepared.root, imagePath) });
          continue;
        }
        filenames.add(filename);

        const metadata = parseFilename(filename);
        if (!metadata) {
          errors.push({ code: "MALFORMED_FILENAME", message: `Filename does not match the expected patient/date/angle convention: ${filename}`, path: relative(prepared.root, imagePath) });
          continue;
        }

        const annotationPath = join(dirname(imagePath), `${basename(imagePath, extname(imagePath))}.txt`);
        let annotation: string | null = null;
        if (await pathExists(annotationPath)) {
          const annotationContent = await readFile(annotationPath, "utf8");
          annotation = relative(prepared.root, annotationPath).replaceAll("\\", "/");
          const invalidLines = annotationContent.split(/\r?\n/).filter((line) => line.trim()).filter((line) => !validateYoloLine(line));
          if (invalidLines.length) errors.push({ code: "INVALID_ANNOTATION", message: `Invalid YOLO annotation in ${basename(annotationPath)}.`, path: relative(prepared.root, annotationPath) });
        } else {
          warnings.push({ code: "MISSING_ANNOTATION", message: `No YOLO annotation found for ${filename}.`, path: relative(prepared.root, imagePath) });
        }

        images.push({ filename, path: relative(prepared.root, imagePath).replaceAll("\\", "/"), split: normalizedSplit, ...metadata, annotation });
      }
    }

    if (!splits.length) errors.push({ code: "MISSING_SPLIT", message: "No supported dataset split containing images was found (train, valid, validation, or test)." });

    const sessions = new Map<string, number>();
    for (const image of images) {
      const key = `${image.patientProfile}\0${image.collectionDate}`;
      sessions.set(key, (sessions.get(key) ?? 0) + 1);
    }

    const collectionSessions = Array.from(sessions.entries()).map(([key, imageCount]) => {
      const sessionParts = key.split("\0");
      const patientProfile = sessionParts[0];
      const collectionDate = sessionParts[1];
      if (patientProfile === undefined || collectionDate === undefined) return null;
      return { patientProfile, collectionDate, imageCount };
    }).filter((session): session is { patientProfile: string; collectionDate: string; imageCount: number } => session !== null);

    return {
      result: {
        datasetRoot: relative(prepared.root, datasetRoot).replaceAll("\\", "/") || ".",
        config,
        classes,
        splits,
        images,
        collectionSessions,
        warnings,
        errors,
      },
      cleanup: prepared.cleanup,
    };
  } catch (error) {
    await prepared.cleanup();
    throw error;
  }
}