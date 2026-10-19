import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";

/**
 * Authenticates an HTTP request using a JWT access token.
 *
 * Extracts the Bearer token from the Authorization header, verifies
 * its signature and expiration, validates the subject as a user ID,
 * and attaches the authenticated identity to req.user.
 *
 * Returns 401 when the token is missing, invalid, expired, or malformed.
 * Returns 500 when the JWT signing secret is not configured.
 */
export const authenticate: RequestHandler = (req, res, next) => {
  const authorization = req.headers.authorization;

  // Require the standard Authorization: Bearer <token> format.
  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.status(401).json({
      success: false,
      message: "Authentication required.",
    });
    return;
  }

  const token = authorization.slice("Bearer ".length).trim();

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Authentication required.",
    });
    return;
  }

  const jwtSecret = process.env.JWT_SECRET;

  // A missing secret is a server configuration error, not a client error.
  if (!jwtSecret) {
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
    return;
  }

  try {
    // verify() checks the JWT signature and rejects expired tokens.
    const decoded = jwt.verify(token, jwtSecret);

    // This application issues tokens with the user ID in the "sub" claim.
    if (
      typeof decoded !== "object" ||
      decoded === null ||
      typeof decoded.sub !== "string"
    ) {
      res.status(401).json({
        success: false,
        message: "Invalid or expired access token.",
      });
      return;
    }

    const userId = Number(decoded.sub);

    // The User model uses an integer ID, so validate the claim accordingly.
    if (!Number.isSafeInteger(userId) || userId <= 0) {
      res.status(401).json({
        success: false,
        message: "Invalid or expired access token.",
      });
      return;
    }

    // Make the verified identity available to subsequent middleware/controllers.
    req.user = { id: userId };

    next();
  } catch {
    // Includes invalid signatures, expired tokens, and malformed JWTs.
    res.status(401).json({
      success: false,
      message: "Invalid or expired access token.",
    });
  }
};