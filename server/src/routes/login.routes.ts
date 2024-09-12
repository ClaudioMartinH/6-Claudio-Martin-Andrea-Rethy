import { Request, Response, Router } from "express";
import { PlayerController } from "../infrastructure/controllers/playerController.js";

const router = Router();
const playerController = new PlayerController();

router.post("/autentication", (req: Request, res: Response) =>
  playerController.login(req, res)
);

export default router;
