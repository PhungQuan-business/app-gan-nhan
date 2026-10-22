import "dotenv/config";

import { prisma } from "../config/prisma.js"; 

async function main(): Promise<void> {
  console.log("Checking PostgreSQL connection through Prisma...");

  await prisma.$connect();

  const result = await prisma.$queryRaw<
    Array<{ database_name: string }>
  >`
    SELECT current_database() AS database_name
  `;

  console.log("✅ Prisma connection successful.");
  console.log(`Database: ${result[0]?.database_name ?? "unknown"}`);
}

async function run(): Promise<void> {
  try {
    await main();
  } catch (error: unknown) {
    console.error("❌ Prisma connection check failed.");

    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }

    process.exitCode = 1;
  } finally {
    try {
      await prisma.$disconnect();
    } catch (error: unknown) {
      console.error("Failed to disconnect Prisma:", error);
      process.exitCode = 1;
    }
  }
}

void run();