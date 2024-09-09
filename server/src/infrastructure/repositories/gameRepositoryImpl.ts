import { PrismaClient, Game } from "@prisma/client";

const prisma = new PrismaClient();

export class GameRepositoryImpl {
    async getGamesForPlayer(playerId: number): Promise<Game[]> {
        return await prisma.game.findMany({
            where: { playerId },
        });
    }

    async createGame(data: Omit<Game, "id">): Promise<Game> {
        return await prisma.game.create({
            data: {
                ...data,
              },
        });
    }
    
    async deleteGames(playerId: number): Promise<number> {
        try {
            const result = await prisma.game.deleteMany({
                where: { playerId },
            });
            return result.count;
        } catch (error) {
            throw new Error(`Player not found or error deleting games: ${error}`);
        }
    }    
}