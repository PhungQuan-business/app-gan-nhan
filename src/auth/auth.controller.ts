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

/**
 * Handles login requests.
 *
 * Validates the request body, delegates credential verification to the
 * authentication service, and returns an access token on success.
 *
 * @param req - Express request containing email and password.
 * @param res - Express response used to return the login result.
 * @param next - Express middleware callback for forwarding unexpected errors.
 */
export async function login(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { email, password } = req.body;

    // Validate request fields before calling the authentication service.
    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
      return;
    }

    const result = await authService.login(email, password);

    // Invalid credentials receive a generic authentication error.
    if (!result.success) {
      res.status(401).json(result);
      return;
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function verifyEmail (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email } = req.body;

    if (
      typeof email !== "string" ||
      !email.trim()
    ) {
      res.status(400).json({
        success: false,
        message: "Email is required.",
      });
      return;
    }
    
    const result = await authService.verifyDulicateEmail(email);

    if (!result.success) {
      res.status(401).json(result);
      return;
    }

    res.status(200).json(result);

  } catch (error) {
    next(error);
  }
}