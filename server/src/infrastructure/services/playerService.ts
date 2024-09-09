import { PlayerRepositoryImpl } from "../repositories/playerRepositoryImpl.js";
import { Player } from "@prisma/client";

export class PlayerService {
  private playerRepository: PlayerRepositoryImpl;
  constructor() {
    this.playerRepository = new PlayerRepositoryImpl();
  }

  async getAllPlayers(): Promise<Player[]> {
    return await this.playerRepository.getAllPlayers();
  }

  async getPlayerById(id: number): Promise<Player | null> {
    try {
      const player = await this.playerRepository.getPlayerById(id);
      if (!player) {
        return null;
      }
      return player;
    } catch (error: any) {
      throw new Error(`Error retrieving player: ${error.message}`);
    }
  }

  async createPlayer(
    data: Omit<Player, "id" | "register_date">
  ): Promise<Player> {
    return await this.playerRepository.createPlayer(data);
  }

  async updatePlayer(
    id: number,
    data: Partial<Omit<Player, "id">>
  ): Promise<Player | null> {
    const player = await this.playerRepository.getPlayerById(id);
    if (!player) {
      throw new Error("Player not found");
    }
    return await this.playerRepository.updatePlayer(id, data);
  }
}
