import { Router } from "express";
import { RankingController } from "../infrastructure/controllers/rankingController.js";

const router = Router();
const rankingController = new RankingController();

router.get("/ranking", rankingController.getRanking);
router.get("/loser", rankingController.getLoser);
router.get("/winner", rankingController.getWinner);

// router.get("/ranking", async (_req, res) => {
//   const ranking = await prisma.ranking.findMany();
//   res.json(ranking);
// });

// router.get("/loser", async (_req, res) => {
//   try {
//     const loser = await prisma.ranking.findFirst({
//       orderBy: {
//         winPercentage: 'asc'
//       },
//     });
//     if (!loser) {
//       return res.status(404).json({ error: "Ranking not found" });
//     }
//     return res.json(loser);
//   } catch (error) {
//     return res.status(500).json({ error: "An error occurred while retrieving the ranking." });
//   }
// });

// router.get("/winner", async (_req, res) => {
//   try {
//     const winner = await prisma.ranking.findFirst({
//       orderBy: {
//         winPercentage: 'desc'
//       },
//     });
//     if (!winner) {
//       return res.status(404).json({ error: "Ranking not found" });
//     }
//     return res.json(winner);
//   } catch (error) {
//     return res.status(500).json({ error: "An error occurred while retrieving the ranking." });
//   }
// });

export default router;
