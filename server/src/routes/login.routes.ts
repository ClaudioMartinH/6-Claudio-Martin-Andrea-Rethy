import { Request, Response, Router } from "express";
import { PlayerController } from "../infrastructure/controllers/playerController.js";

const router = Router();
const playerController = new PlayerController();

router.post("/authentication", (req: Request, res: Response) =>
  playerController.login(req, res)
);
router.post("/guest", (req: Request, res: Response) => {
  playerController.guestLogin(req, res)
})

export default router;
