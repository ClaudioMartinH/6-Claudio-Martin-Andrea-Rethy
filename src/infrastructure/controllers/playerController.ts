import { Request, Response } from "express";
import { PlayerService } from "../services/playerService.js";

const playerService = new PlayerService();

export class PlayerController {
  async getAllPlayers(_req: Request, res: Response) {
    try {
      const players = await playerService.getAllPlayers();
      if (!players) {
        return res.status(404).json({ message: "No players found" });
      }
      return res.status(200).json(players);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
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
      return res.status(200).json(player);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
  async createPlayer(req: Request, res: Response) {
    const { name, password } = req.body;
    if (!name || !password) {
      return res
        .status(400)
        .json({ message: "Missing required fields: name, password" });
    }
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
    if (!name && !password) {
      return res.status(400).json({ message: "No fields to update" });
    }
    try {
      const updatedPlayer = await playerService.updatePlayer(ID, {
        name,
        password,
      });
      if (!updatedPlayer) {
        return res.status(404).json({ message: "Player not found" });
      }
      return res.status(200).json(updatedPlayer);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
