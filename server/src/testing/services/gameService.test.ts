import { describe, it, expect, vi } from "vitest";
import { GameService } from "../../infrastructure/services/gameService.js";
import { Game } from "@prisma/client";

const mockGameRepository = {
  getGamesForPlayer: vi.fn(),
  createGame: vi.fn(),
  deleteGames: vi.fn(),
};

const gameService = new GameService();

gameService["gameRepository"] = mockGameRepository as any;

describe("GameService", () => {
  describe("getGamesForPlayer", () => {
    it("should return games for the player", async () => {
      const playerId = 1;
      const testGame: Game[] = [
        {
          id: 1,
          playerId,
          dice1Result: 3,
          dice2Result: 4,
          overallResult: "Win",
        },
      ];
      mockGameRepository.getGamesForPlayer.mockResolvedValue(testGame);

      const games = await gameService.getGamesForPlayer(playerId);

      expect(mockGameRepository.getGamesForPlayer).toHaveBeenCalledWith(
        playerId
      );
      expect(games).toEqual(testGame);
    });
  });
  describe("createGame", () => {
    it("should create a game and return it", async () => {
      const testGame: Omit<Game, "id"> = {
        playerId: 1,
        dice1Result: 3,
        dice2Result: 4,
        overallResult: "Win",
      };
      const newGame: Game = { id: 1, ...testGame };

      mockGameRepository.createGame.mockResolvedValue(newGame);

      const createdGame = await gameService.createGame(testGame);

      expect(mockGameRepository.createGame).toHaveBeenCalledWith(testGame);
      expect(createdGame).toEqual(newGame);
    });
  });
  describe("deleteGames", () => {
    it("should throw an error if no games are found for the player", async () => {
      const playerId = 1;

      mockGameRepository.getGamesForPlayer.mockResolvedValue(null);

      await expect(gameService.deleteGames(playerId)).rejects.toThrow(
        "Games for this player not found"
      );
      expect(mockGameRepository.getGamesForPlayer).toHaveBeenCalledWith(
        playerId
      );
    });

    it("should delete games and return the number of deleted games", async () => {
      const playerId = 1;
      const testGame: Game[] = [
        {
          id: 1,
          playerId,
          dice1Result: 3,
          dice2Result: 4,
          overallResult: "Win",
        },
      ];

      mockGameRepository.getGamesForPlayer.mockResolvedValue(testGame);
      mockGameRepository.deleteGames.mockResolvedValue(testGame.length);

      const deletedCount = await gameService.deleteGames(playerId);

      expect(mockGameRepository.getGamesForPlayer).toHaveBeenCalledWith(
        playerId
      );
      expect(mockGameRepository.deleteGames).toHaveBeenCalledWith(playerId);
      expect(deletedCount).toBe(testGame.length);
    });
  });
});
