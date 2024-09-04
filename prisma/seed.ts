const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const player = await prisma.player.create({
    data: {
      name: "Andrea",
      password: "securepassword",
    },
  });
  const game = await prisma.game.create({
    data: {
      playerId: player.id,
      dice1Result: 4,
      dice2Result: 3,
      overallResult: "win",
    },
  });
  const ranking = await prisma.ranking.create({
    data: {
      playerId: player.id,
      totalGames: 1,
      totalWins: 1,
      totalLost: 0,
      winPercentage: 100.0,
    },
  });

  console.log("Datos insertados correctamente:", { player, game, ranking });
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
