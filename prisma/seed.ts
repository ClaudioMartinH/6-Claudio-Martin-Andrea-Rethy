// import { PrismaClient } from "@prisma/client";
import { prisma } from "src/db.js";

async function main() {
  await prisma.player.create({
    data: {
      name: "Claudio",
      password: "password123"
    }
  });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
