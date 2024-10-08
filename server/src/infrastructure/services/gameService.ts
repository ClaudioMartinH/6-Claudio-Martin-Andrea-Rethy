import { GameRepositoryImpl } from "../repositories/gameRepositoryImpl.js";
import { Game } from "@prisma/client";

export class GameService {
    private gameRepository: GameRepositoryImpl;
    constructor() {
    this.gameRepository = new GameRepositoryImpl();
  }

  async getGamesForPlayer(playerId: number): Promise<Game[]> {
    return await this.gameRepository.getGamesForPlayer(playerId);
    }


    async createGame(data: Omit<Game, "id">): Promise<Game> {
        return await this.gameRepository.createGame(data);
    }

    async deleteGames(playerId: number): Promise<number> {
        const games = await this.gameRepository.getGamesForPlayer(playerId);
        if (!games) {
        throw new Error("Games for this player not found");
        }
        return await this.gameRepository.deleteGames(playerId);
    }
}