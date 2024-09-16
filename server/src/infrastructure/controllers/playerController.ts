import { Request, Response } from "express";
import { PlayerService } from "../services/playerService.js";
import jwt from "jsonwebtoken";

const playerService = new PlayerService();

export class PlayerController {
  async getAllPlayers(_req: Request, res: Response) {
    try {
      const players = await playerService.getAllPlayers();
      if (players.length === 0) {
        return res.status(404).json({ message: "No players found" });
      }
      return res.status(200).json(players);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
  async getPlayerById(req: Request, res: Response) {
    const { id } = req.params;
    const ID = parseInt(id, 10);

    if (isNaN(ID)) {
      return res.status(400).json({ message: "Invalid player name" });
    }

    try {
      const player = await playerService.getPlayerById(ID);
      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }
      return res.status(200).json(player);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getPlayerByName(req: Request, res: Response) {
    const { name } = req.params;
    if (!name) {
      return res.status(400).json({ message: "Missing required field" });
    }
    try {
      const player = await playerService.getPlayerByName(name);
      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }
      return res.status(200).json(player);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
  async createPlayer(req: Request, res: Response) {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (typeof name !== "string") {
      return res
        .status(400)
        .json({ message: "Invalid name. It should be a string" });
    }
    try {
      const newPlayer = await playerService.createPlayer({
        name,
      });
      return res.status(201).json(newPlayer);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
  async updatePlayer(req: Request, res: Response) {
    const { id } = req.params;
    const ID = parseInt(id);
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "No fields to update" });
    }
    try {
      const updatedPlayer = await playerService.updatePlayer(ID, {
        name,
      });
      if (!updatedPlayer) {
        return res.status(404).json({ message: "Player not found" });
      }
      return res.status(200).json(updatedPlayer);
    } catch (error: any) {
      if (error.message === "Player not found") {
        return res.status(404).json({ message: "Player not found" });
      }
      return res.status(500).json({ error: error.message });
    }
  }
  async login(req: Request, res: Response) {
    try {
      const { playerName } = req.body;
      if (!playerName) {
        return res.status(400).json({ message: "Missing required field" });
      }
      const player = await playerService.getPlayerByName(playerName);
      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }
      // en este caso, firmamos el token con playerName como dijimos, que, al ser unique, no deberia darnos problemas
      const token = jwt.sign(
        { playerName: playerName.name },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );
      return res.status(200).json({
        token,
        playerName: playerName,
      });
    } catch (error) {
      console.error("Error logging in: ", error);
      return res
        .status(500)
        .json({ message: "An error occurred during login" });
    }
  }
}
