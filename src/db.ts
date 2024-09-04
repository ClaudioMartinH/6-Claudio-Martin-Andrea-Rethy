import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function cleanDatabase() {
  try {
    await prisma.ranking.deleteMany({});
    await prisma.game.deleteMany({});
    await prisma.player.deleteMany({});
  } catch (error) {
    console.error("Error limpiando la base de datos:", error);
  }
}
