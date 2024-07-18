import { Router } from "express";
import { prisma } from "../db.js";

const router = Router();

router.get("/ranking", async (_req, res) => {
  const ranking = await prisma.ranking.findMany();
  res.json(ranking);
});


export default router;
