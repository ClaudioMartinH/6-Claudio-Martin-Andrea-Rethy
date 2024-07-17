import { Router } from "express";
import { prisma } from "../db.js";

const router = Router();

router.get("/games", async (_req, res) => {
  const games = await prisma.game.findMany();
  res.json(games);
});

router.delete("/games/:id", async (req, res) => {
  const deletedGame = await prisma.game.delete({
    where: { id: parseInt(req.params.id) },
  });
  if (!deletedGame)
    return res.status(404).json({ error: "Game not found" });
  return res.json(deletedGame);
});

export default router;
