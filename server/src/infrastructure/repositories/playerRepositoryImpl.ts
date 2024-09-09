import { PrismaClient, Player } from "@prisma/client";

const prisma = new PrismaClient();

export class PlayerRepositoryImpl {
  async getAllPlayers(): Promise<Player[]> {
    return await prisma.player.findMany();
  }

  async getPlayerById(id: number): Promise<Player | null> {
    return await prisma.player.findUnique({
      where: { id },
    });
  }

  async createPlayer(
    data: Omit<Player, "id" | "register_date">
  ): Promise<Player> {
    return await prisma.player.create({
      data: {
        ...data,
        register_date: new Date(),
      },
    });
  }

  async updatePlayer(
    id: number,
    data: Partial<Omit<Player, "id">>
  ): Promise<Player | null> {
    try {
      return await prisma.player.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new Error(`Player not found or error updating player: ${error}`);
    }
  }
}
