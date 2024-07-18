import { Router } from "express";
import { prisma } from "../db.js";

const router = Router();

router.get("/players", async (_req, res) => {
  const players = await prisma.player.findMany();
  res.json(players);
});
router.get("/players/:id", async (req, res) => {
  const player = await prisma.player.findFirst({
    where: { id: parseInt(req.params.id) },
    include: {
      playerGames: true,
    },
  });
  if (!player) return res.status(404).json({ error: "Player not found" });
  return res.json(player);
});
router.post("/players", async (req, res) => {
  const newPlayer = await prisma.player.create({
    data: req.body,
  });
  res.json(newPlayer);
});

router.put("/players/:id", async (req, res) => {
  const { name } = req.body;
  const playerId = parseInt(req.params.id);
  if (!name)
    return res.status(404).json({ error: "Name is required for update" });
  try {
    const updatedPlayer = await prisma.player.update({
      where: { id: playerId },
      data: { name },
    });
    if (!updatedPlayer)
      return res.status(404).json({ error: "Player not found" });
    return res.json(updatedPlayer);
  } catch (error) {
    console.error("An error occurred while updating the player", error);
    return res
      .status(500)
      .json({ error: "An error occurred while updating the player" });
  }
});

router.delete("/players/:id", async (req, res) => {
  const deletedPlayer = await prisma.player.delete({
    where: { id: parseInt(req.params.id) },
  });
  if (!deletedPlayer)
    return res.status(404).json({ error: "Player not found" });
  return res.json(deletedPlayer);
});

export default router;
