// controllers/auth.controller.ts

import type { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service.js";

export async function requestOtp(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email } = req.body;

    const result = await authService.sendOtp(email);

    res.status(202).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function verifyOtp(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email, otp } = req.body;

    const result = await authService.verifyOtp(email, otp);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Handles signup requests after email verification.
 */
export async function completeSignup(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { name, email, password, signupToken } = req.body;

    // Validate required fields before calling the service.
    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      typeof signupToken !== "string" ||
      (name !== undefined && typeof name !== "string")
    ) {
      res.status(400).json({
        success: false,
        message: "Invalid signup details.",
      });
      return;
    }

    const result = await authService.completeSignup(
      name,
      email,
      password,
      signupToken,
    );

    if (!result.success) {
      const status =
        result.message === "An account with this email already exists."
          ? 409
          : 400;

      res.status(status).json(result);
      return;
    }

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function login(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}