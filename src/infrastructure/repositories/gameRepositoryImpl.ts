import { PrismaClient, PlayerGame } from "@prisma/client";

const prisma = new PrismaClient();

export class GameRepositoryImpl {
    async getGamesForPlayer(playerId: number): Promise<PlayerGame[]> {
        return await prisma.playerGame.findMany({
            where: { playerId },
        });
    }

    async createGame(data: Omit<PlayerGame, "id">): Promise<PlayerGame> {
        return await prisma.playerGame.create({
            data: {
                ...data,
              },
        });
    }
    
    async deleteGames(playerId: number): Promise<number> {
        try {
            const result = await prisma.playerGame.deleteMany({
                where: { playerId },
            });
            return result.count;
        } catch (error) {
            throw new Error(`Player not found or error deleting games: ${error}`);
        }
    }    
}