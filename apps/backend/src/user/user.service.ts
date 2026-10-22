import { prisma } from "../../config/prisma.js";


/**
 * Retrieves a user's public profile by database ID.
 *
 * Selects only public fields and excludes the stored password hash.
 *
 * @param userId - The authenticated user's database ID.
 * @returns The user's public profile, or null if the user doesn't exist.
 */
export async function getUserById(userId: number) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}