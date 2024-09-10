import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { RankingController } from "../../infrastructure/controllers/rankingController.js";
import { Request, Response } from "express";
import { prisma } from "../../db.js";

const rankingController = new RankingController();
let testRankingIds: number[] = [];
let testPlayerIds: number[] = [];

describe("RankingController", () => {
  // Inserta datos de prueba antes de cada test
  beforeEach(async () => {
    // Primero, crea jugadores (o cualquier entidad relacionada que necesite estar presente)
    await prisma.player.createMany({
      data: [
        { id: 1, name: "Player 1" },
        { id: 2, name: "Player 2" },
      ],
    });
    const players = await prisma.player.findMany({
      where: {
        id: { in: [1, 2] },
      },
    });
    testPlayerIds = players.map((player) => player.id);

    await prisma.ranking.createMany({
      data: [
        { playerId: testPlayerIds[0], winPercentage: 60 },
        { playerId: testPlayerIds[1], winPercentage: 40 },
      ],
    });

    const rankings = await prisma.ranking.findMany({
      where: {
        playerId: { in: testPlayerIds },
      },
    });
    testRankingIds = rankings.map((ranking) => ranking.id);
  });

  afterEach(async () => {
    await prisma.ranking.deleteMany({
      where: {
        id: { in: testRankingIds },
      },
    });

    await prisma.player.deleteMany({
      where: {
        id: { in: testPlayerIds },
      },
    });

    testRankingIds = [];
    testPlayerIds = [];
  });

  describe("getRanking", () => {
    it("should return 200 and all rankings", async () => {
      const req = {} as unknown as Request;
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      } as unknown as Response;

      await rankingController.getRanking(req, res);

      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            playerId: testPlayerIds[0],
            winPercentage: 60,
          }),
          expect.objectContaining({
            playerId: testPlayerIds[1],
            winPercentage: 40,
          }),
        ])
      );
    });

    // it("should return 404 if no rankings found", async () => {
    //   await prisma.ranking.deleteMany({
    //     where: {
    //       id: { in: testRankingIds },
    //     },
    //   });
    //   testRankingIds = [];

    //   const req = {} as unknown as Request;
    //   const res = {
    //     status: vi.fn().mockReturnThis(),
    //     json: vi.fn(),
    //   } as unknown as Response;

    //   expect(res.status).toBeCalledWith(404);
    //   expect(res.json).toBeCalledWith({
    //     message: "Games for player not found",
    //   });
    // });
  });
  describe("getLoser", () => {
    it("should return 200 and the loser ranking", async () => {
      const req = {} as unknown as Request;
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      } as unknown as Response;

      await rankingController.getLoser(req, res);

      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith(
        expect.objectContaining({
          playerId: 23,
          winPercentage: 0,
        })
      );
    });
  });

  describe("getWinner", () => {
    it("should return 200 and the winner ranking", async () => {
      const req = {} as unknown as Request;
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      } as unknown as Response;

      await rankingController.getWinner(req, res);

      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith(
        expect.objectContaining({
          playerId: 22,
          winPercentage: 100,
        })
      );
    });
  });
});

// import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
// import { RankingController } from "../../infrastructure/controllers/rankingController.js";
// import { Request, Response } from "express";
// import { prisma } from "../../db.js";

// const rankingController = new RankingController();
// let testRankingIds: number[] = [];

// describe("RankingController", () => {
//   beforeEach(async () => {
//     const createdRankings = await prisma.ranking.createMany({
//       data: [
//         {
//           playerId: 1,
//           totalGames: 10,
//           totalWins: 6,
//           totalLost: 4,
//           winPercentage: 60,
//         },
//         {
//           playerId: 2,
//           totalGames: 10,
//           totalWins: 4,
//           totalLost: 6,
//           winPercentage: 40,
//         },
//       ],
//     });

//     const rankings = await prisma.ranking.findMany({
//       where: {
//         playerId: { in: [1, 2] },
//       },
//     });
//     testRankingIds = rankings.map((ranking) => ranking.id);
//   });

//   afterEach(async () => {
//     await prisma.ranking.deleteMany({
//       where: {
//         id: { in: testRankingIds },
//       },
//     });
//     testRankingIds = [];
//   });

//   describe("getRanking", () => {
//     it("should return 200 and all rankings", async () => {
//       const req = {} as unknown as Request;
//       const res = {
//         status: vi.fn().mockReturnThis(),
//         json: vi.fn(),
//       } as unknown as Response;

//       await rankingController.getRanking(req, res);

//       expect(res.status).toBeCalledWith(200);
//       expect(res.json).toBeCalledWith(
//         expect.arrayContaining([
//           expect.objectContaining({ playerId: 1, winPercentage: 60 }),
//           expect.objectContaining({ playerId: 2, winPercentage: 40 }),
//         ])
//       );
//     });

//     it("should return 404 if no rankings found", async () => {
//       await prisma.ranking.deleteMany({
//         where: {
//           id: { in: testRankingIds },
//         },
//       });
//       testRankingIds = [];

//       const req = {} as unknown as Request;
//       const res = {
//         status: vi.fn().mockReturnThis(),
//         json: vi.fn(),
//       } as unknown as Response;

//       await rankingController.getRanking(req, res);

//       expect(res.status).toBeCalledWith(404);
//       expect(res.json).toBeCalledWith({
//         message: "Games for player not found",
//       });
//     });
//   });

//   describe("getLoser", () => {
//     it("should return 200 and the loser ranking", async () => {
//       const req = {} as unknown as Request;
//       const res = {
//         status: vi.fn().mockReturnThis(),
//         json: vi.fn(),
//       } as unknown as Response;

//       await rankingController.getLoser(req, res);

//       expect(res.status).toBeCalledWith(200);
//       expect(res.json).toBeCalledWith(
//         expect.objectContaining({
//           playerId: 2,
//           winPercentage: 40,
//         })
//       );
//     });
//   });

//   describe("getWinner", () => {
//     it("should return 200 and the winner ranking", async () => {
//       const req = {} as unknown as Request;
//       const res = {
//         status: vi.fn().mockReturnThis(),
//         json: vi.fn(),
//       } as unknown as Response;

//       await rankingController.getWinner(req, res);

//       expect(res.status).toBeCalledWith(200);
//       expect(res.json).toBeCalledWith(
//         expect.objectContaining({
//           playerId: 1,
//           winPercentage: 60,
//         })
//       );
//     });
//   });
// });

// import { Request, Response } from "express";
// import { prisma } from "../../db.js";
// import { describe, expect, it, vi } from "vitest";
// import { RankingController } from "../../infrastructure/controllers/rankingController.js";

// const rankingController = new RankingController();

// describe("RankingController", () => {
//   it("should return all rankings", async () => {
//     const rankings = await prisma.ranking.findMany();
//     expect(Array.isArray(rankings)).toBeTruthy();
//   });
//   it("should return the loser", async () => {
//     const loser = await prisma.ranking.findFirst({
//       where: {
//         winPercentage: {
//           lte: 50,
//         },
//       },
//     });
//     expect(loser).toBeTruthy();
//   });
//   it("should return the winner", async () => {
//     const winner = await prisma.ranking.findFirst({
//       where: {
//         winPercentage: {
//           gte: 50,
//         },
//       },
//     });
//     expect(winner).toBeTruthy();
//   });
// });
