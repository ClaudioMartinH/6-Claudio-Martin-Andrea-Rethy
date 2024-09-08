import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.ranking.deleteMany({});
  await prisma.game.deleteMany({});
  await prisma.player.deleteMany({});

  const player1 = await prisma.player.create({
    data: {
      name: "Andrea",
    },
  });
  const player2 = await prisma.player.create({
    data: {
      name: "Claudio",
    },
  });
  const game = await prisma.game.create({
    data: {
      playerId: player1.id,
      dice1Result: 4,
      dice2Result: 3,
      overallResult: "win",
    },
  });
  const game2 = await prisma.game.create({
    data: {
      playerId: player2.id,
      dice1Result: 6,
      dice2Result: 3,
      overallResult: "loss",
    },
  });
  const ranking = await prisma.ranking.create({
    data: {
      playerId: player1.id,
      totalGames: 1,
      totalWins: 1,
      totalLost: 0,
      winPercentage: 100.0,
    },
  });
  const ranking2 = await prisma.ranking.create({
    data: {
      playerId: player2.id,
      totalGames: 1,
      totalWins: 0,
      totalLost: 1,
      winPercentage: 0.0,
    },
  });

  console.log("Datos insertados correctamente:", {
    player1,
    player2,
    game,
    game2,
    ranking,
    ranking2,
  });
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
