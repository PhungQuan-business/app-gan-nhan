import type { Request, Response, NextFunction } from "express";
import * as userService from "./user.service.js";

/**
 * Returns the profile of the authenticated user.
 *
 * Requires the authenticate middleware to populate req.user.
 * Uses the verified user ID rather than accepting a user ID from
 * the request body or query parameters.
 */
export async function getMe(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const userId = req.user?.id;

    // Defensive check in case this handler is accidentally used without authentication.
    if (userId === undefined) {
      res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
      return;
    }

    const user = await userService.getUserById(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
}