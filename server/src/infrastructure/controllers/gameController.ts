import { Request, Response } from "express";
import { GameService } from "../services/gameService.js";

const gameService = new GameService();

export class GameController {
  async getGamesForPlayer(req: Request, res: Response) {
    const { id } = req.params;
    const playerID = parseInt(id);
    try {
      const games = await gameService.getGamesForPlayer(playerID);
      if (!games || games.length === 0) {
        //si devuelve array vacio se considera truthy y pasa el test
        return res.status(404).json({ message: "Games for player not found" });
      }
      return res.status(200).json(games);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async createGame(req: Request, res: Response) {
    const { playerId, dice1Result, dice2Result, overallResult } = req.body;
    if (!playerId || !dice1Result || !dice2Result || !overallResult) {
      return res.status(400).json({
        message:
          "Missing required fields: playerId, dice1Result, dice2Result, overallResult",
      });
    }
    try {
      const newGame = await gameService.createGame({
        playerId,
        dice1Result,
        dice2Result,
        overallResult,
      });
      return res.status(201).json(newGame);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async deleteGames(req: Request, res: Response) {
    const { id } = req.params;
    const playerID = parseInt(id);
    try {
      const games = await gameService.deleteGames(playerID);
      if (!games) {
        return res.status(404).json({ message: "Games for player not found" });
      }
      return res.status(200).json({ message: "Games deleted successfully" });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
