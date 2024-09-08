import { describe, expect, it, vi } from "vitest";
import { RankingService } from "../../infrastructure/services/rankingService.js";
import { prisma } from "../../db.js";

const rankingService = new RankingService();

describe("RankingService", () => {
  // beforeEach(() => {
  //   vi.clearAllMocks();
  // });
  describe("get ranking", () => {
    it("returns a list of rankings", async () => {
      const ranking = await rankingService.getRanking();
      expect(Array.isArray(ranking)).toBe(true);
    });

    it("throws an error if the ranking service fails", async () => {
      vi.spyOn(rankingService, "getRanking").mockRejectedValueOnce(
        new Error("Failed to fetch ranking")
      );
      await expect(rankingService.getRanking()).rejects.toThrow(
        "Failed to fetch ranking"
      );
    });
    it("handles empty ranking", async () => {
      vi.spyOn(rankingService, "getRanking").mockResolvedValueOnce([]);
      const ranking = await rankingService.getRanking();
      expect(ranking).toEqual([]);
    });
  });
  describe("getLoser", () => {
    it("returns the loser", async () => {
      const loser = await prisma.ranking.findFirst({
        orderBy: { winPercentage: "desc" },
        select: {
          player: true,
        },
      });
      expect(loser).toBeTruthy();
    });
    it("throws an error if the ranking service fails", async () => {
      vi.spyOn(rankingService, "getLoser").mockRejectedValueOnce(
        new Error("Failed to fetch loser")
      );
      await expect(rankingService.getLoser()).rejects.toThrow(
        "Failed to fetch loser"
      );
    });
  });
  describe("getWinner", () => {
    it("returns the winner", async () => {
      const winner = await prisma.ranking.findFirst({
        orderBy: { winPercentage: "asc" },
        select: {
          player: true,
        },
      });
      expect(winner).toBeTruthy();
    });
    it("throws an error if the ranking service fails", async () => {
      vi.spyOn(rankingService, "getWinner").mockRejectedValueOnce(
        new Error("Failed to fetch winner")
      );
      await expect(rankingService.getWinner()).rejects.toThrow(
        "Failed to fetch winner"
      );
    });
  });
});
