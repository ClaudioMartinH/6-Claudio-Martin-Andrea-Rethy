import { Router } from "express";
import { GameController } from "../infrastructure/controllers/gameController.js";

const router = Router();
const gameController = new GameController();

router.get("/playerGames/:id", gameController.getGamesForPlayer);
router.post("/playerGames/:id", gameController.createGame);
router.delete("/playerGames/:id", gameController.deleteGames);

// router.get("/games", async (_req, res) => {
//   const games = await prisma.game.findMany();
//   res.json(games);
// });

// router.delete("/games/:id", async (req, res) => {
//   const deletedGame = await prisma.game.delete({
//     where: { id: parseInt(req.params.id) },
//   });
//   if (!deletedGame)
//     return res.status(404).json({ error: "Game not found" });
//   return res.json(deletedGame);
// });

export default router;
