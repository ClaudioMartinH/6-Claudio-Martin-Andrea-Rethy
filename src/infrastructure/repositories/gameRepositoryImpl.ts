import { PrismaClient, PlayerGame } from "@prisma/client";

const prisma = new PrismaClient();

export class GameRepositoryImpl {
    async getGamesForPlayer(playerId: Number): Promise<PlayerGame[]> {
        return await prisma.playerGame.findMany({
            where: { playerId },
        });
    }
}