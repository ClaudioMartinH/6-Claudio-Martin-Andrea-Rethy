import { describe, expect, it, vi } from "vitest";
import { GameController } from "../../infrastructure/controllers/gameController.js";
import { Request, Response } from "express";
import { prisma } from "../../db.js";

const gameController = new GameController();

describe("GameController", () => {
  // beforeEach(async () => {
  //   await prisma.game.deleteMany({
  //     where: {
  //       playerId: { in: [1, 2, 3] },
  //     },
  //   });
  //   await prisma.player.deleteMany({
  //     where: {
  //       name: { in: ["Player-1", "Player-2"] },
  //     },
  //   });
  // });

  describe("getGamesForPlayer", () => {
    // it("should return 404 if no games are found for the player", async () => {
    //   const player = await prisma.player.findFirst({
    //     where: {
    //       name: "Player-1",
    //     },
    //   });

    //   const req = {
    //     params: { id: player?.id.toString() },
    //   } as unknown as Request;
    //   const res = {
    //     status: vi.fn().mockReturnThis(),
    //     json: vi.fn(),
    //   } as unknown as Response;

    //   await gameController.getGamesForPlayer(req, res);

    //   expect(res.status).toBeCalledWith(404);
    //   expect(res.json).toBeCalledWith({
    //     message: "Games for player not found",
    //   });
    // });

    it("should return 200 and games if games are found for the player", async () => {
      const player = await prisma.player.findFirst({
        where: {
          name: "Player-2",
        },
      });
      if (player)
        await prisma.game.create({
          data: {
            playerId: player?.id,
            dice1Result: 3,
            dice2Result: 4,
            overallResult: "win",
          },
        });

      const req = {
        params: { id: player?.id.toString() },
      } as unknown as Request;
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      } as unknown as Response;

      await gameController.getGamesForPlayer(req, res);

      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            playerId: player?.id,
            dice1Result: 3,
            dice2Result: 4,
            overallResult: "win",
          }),
        ])
      );
    });
  });

  describe("createGame", () => {
    it("should create a new game", async () => {
      const player = await prisma.player.findFirst({
        where: {
          name: "Player-2",
        },
      });
      if (!player) {
        return;
      }
      const req = {
        body: {
          playerId: player.id,
          dice1Result: 2,
          dice2Result: 5,
          overallResult: "win",
        },
      } as unknown as Request;

      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      } as unknown as Response;

      await gameController.createGame(req, res);

      expect(res.status).toBeCalledWith(201);
      expect(res.json).toBeCalledWith(
        expect.objectContaining({
          playerId: player.id,
          dice1Result: 2,
          dice2Result: 5,
          overallResult: "win",
        })
      );
    });

    it("should return 400 if missing required fields", async () => {
      const req = {
        body: {},
      } as unknown as Request;

      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      } as unknown as Response;

      await gameController.createGame(req, res);

      expect(res.status).toBeCalledWith(400);
      expect(res.json).toBeCalledWith({
        message:
          "Missing required fields: playerId, dice1Result, dice2Result, overallResult",
      });
    });
  });

  describe("deleteGames", () => {
    it("should delete games for a player and return 204", async () => {
      const player = await prisma.player.findFirst({
        where: {
          name: "Player-2",
        },
      });
      if (!player) {
        return;
      }
      await prisma.game.create({
        data: {
          playerId: player.id,
          dice1Result: 3,
          dice2Result: 5,
          overallResult: "loss",
        },
      });

      const req = {
        params: { id: player.id.toString() },
      } as unknown as Request;
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      } as unknown as Response;

      await gameController.deleteGames(req, res);

      expect(res.status).toBeCalledWith(204);
      expect(res.json).toBeCalledWith(expect.objectContaining({}));
    });

    it("should return 404 if no games found to delete", async () => {
      // Crea un jugador sin juegos
      const player = await prisma.player.findFirst({
        where: {
          name: "Player-2",
        },
      });
      if (!player) {
        return;
      }
      const req = {
        params: { id: player.id.toString() },
      } as unknown as Request;
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      } as unknown as Response;

      await gameController.deleteGames(req, res);

      expect(res.status).toBeCalledWith(404);
      expect(res.json).toBeCalledWith({
        message: "Games for player not found",
      });
    });
  });
});

// import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
// import { Request, Response } from "express";
// import { prisma } from "../../db.js";
// import { GameController } from "../../infrastructure/controllers/gameController.js";

// const gameController = new GameController();

// describe("GameController", () => {
//   // beforeEach(async () => {
//   //   await prisma.game.deleteMany({
//   //     where: {
//   //       playerId: 70,
//   //     },
//   //   });
//   // });
//   it("should create a new game for a player", async () => {
//     const req = {
//       body: {
//         playerId: "70",
//         dice1Result: 4,
//         dice2Result: 3,
//         overallResult: "win",
//       },
//     } as unknown as Request;
//     const res = {
//       json: vi.fn(),
//     } as unknown as Response;
//     await gameController.createGame(req, res);
//     expect(res.statusCode).toEqual(201);
//     expect(res.json).toBeCalledWith({
//       id: 1,
//       playerId: 22,
//       dice1Result: 4,
//       dice2Result: 3,
//       overallResult: "win",
//     });
//   });
// });
