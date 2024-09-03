import { PrismaClient, Ranking } from "@prisma/client";

const prisma = new PrismaClient();

export class RankingRepositoryImpl {
    async getRanking(): Promise<Ranking[]> {
        return await prisma.ranking.findMany({
            orderBy: {
                winPercentage: 'asc'
              },
        });
    };

    async getLoser(): Promise<Ranking | null> {
        return await prisma.ranking.findFirst({
            orderBy: {
                winPercentage: 'asc'
              },
        });
    };

    async getWinner(): Promise<Ranking | null> {
        return await prisma.ranking.findFirst({
            orderBy: {
                winPercentage: 'desc'
              },
        });
    };
}