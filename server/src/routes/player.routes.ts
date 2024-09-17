import { Router } from "express";
import { PlayerController } from "../infrastructure/controllers/playerController.js";

const router = Router();
const playerController = new PlayerController();

router.get("/players", playerController.getAllPlayers);
router.get("/players/:id", playerController.getPlayerById);
router.get("/players/name/:name", playerController.getPlayerByName);
router.put("/players/:id", playerController.updatePlayer);

export default router;