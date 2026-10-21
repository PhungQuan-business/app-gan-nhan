/**
 * Extends Express Request with the authenticated user's identity.
 *
 * The authentication middleware populates this property only after
 * successfully verifying the request's JWT.
 */
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
      };
    }
  }
}

export {};