import { Request, Response } from "express";
import { PlayerService } from "../services/playerService.js";

const playerService = new PlayerService();

export class PlayerController {
  async getAllPlayers(_req: Request, res: Response) {
    try {
      const players = await playerService.getAllPlayers();
      res.json(players);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
  async getPlayerById(req: Request, res: Response) {
    const { id } = req.params;
    const ID = parseInt(id);
    try {
      const player = await playerService.getPlayerById(ID);
      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }
      return res.json(player);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
  async createPlayer(req: Request, res: Response) {
    const { name, password } = req.body;
    try {
      const newPlayer = await playerService.createPlayer({
        name,
        password,
      });
      return res.status(201).json(newPlayer);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
  async updatePlayer(req: Request, res: Response) {
    const { id } = req.params;
    const ID = parseInt(id);
    const { name, password } = req.body;
    try {
      const updatedPlayer = await playerService.updatePlayer(ID, {
        name,
        password,
      });
      if (!updatedPlayer) {
        return res.status(404).json({ message: "Player not found" });
      }
      return res.json(updatedPlayer);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
