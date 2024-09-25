import { PrismaClient, Game } from "@prisma/client";

const prisma = new PrismaClient();

export class GameRepositoryImpl {
    async getGamesForPlayer(playerId: number): Promise<Game[]> {
        return await prisma.game.findMany({
            where: { playerId },
        });
    }

    async createGame(data: Omit<Game, "id">): Promise<Game> {
        const newGame = await prisma.game.create({
                data: {
                    ...data,
                },
            })
            if (data.overallResult === "Win") {
                const updatedRanking = await prisma.ranking.upsert({
                    where: { playerId: data.playerId },
                    update: {
                        totalGames: { increment: 1},
                        totalWins: { increment: 1}
                    },
                    create: {
                        playerId: data.playerId,
                        totalGames: 1,
                        totalWins: 1,
                    },
                });
                const percentage = (updatedRanking.totalWins / updatedRanking.totalGames) * 100;
                await prisma.ranking.upsert({
                    where: { playerId: data.playerId },
                    update: {
                        winPercentage: percentage,
                    },
                    create: {
                        playerId: data.playerId,
                        winPercentage: percentage,
                    },
                })
            } else {
                const updatedRanking = await prisma.ranking.upsert({
                    where: { playerId: data.playerId },
                    update: {
                        totalGames: { increment: 1},
                        totalLost: { increment: 1}
                    },
                    create: {
                        playerId: data.playerId,
                        totalGames: 1,
                        totalLost: 1,
                    },
                });
                const percentage = (updatedRanking.totalLost / updatedRanking.totalGames) * 100;
                await prisma.ranking.upsert({
                    where: { playerId: data.playerId },
                    update: {
                        winPercentage: percentage,
                    },
                    create: {
                        playerId: data.playerId,
                        winPercentage: percentage,
                    },
                })
            }
        return newGame;
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