import { Request, Response } from "express";
import { RankingService } from "../services/rankingService.js";

const rankingService = new RankingService();

export class RankingController {
  async getRanking(_req: Request, res: Response) {
    try {
      const ranking = await rankingService.getRanking();
      if (!ranking) {
        return res.status(404).json({ message: "Games for player not found" });
      }
      return res.status(200).json(ranking);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getLoser(_req: Request, res: Response) {
    try {
      const ranking = await rankingService.getLoser();
      if (!ranking) {
        return res.status(404).json({ message: "Games for player not found" });
      }
      return res.status(200).json(ranking);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getWinner(_req: Request, res: Response) {
    try {
      const ranking = await rankingService.getWinner();
      if (!ranking) {
        return res.status(404).json({ message: "Games for player not found" });
      }
      return res.status(200).json(ranking);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
