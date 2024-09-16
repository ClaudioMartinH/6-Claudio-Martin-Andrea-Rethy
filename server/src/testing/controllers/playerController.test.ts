import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { PlayerController } from "../../infrastructure/controllers/playerController.js";
import { Request, Response } from "express";
import { prisma } from "../../db.js";

const playerController = new PlayerController();

describe("PlayerController", () => {
  beforeEach(async () => {
    await prisma.player.deleteMany({
      where: {
        name: { in: ["Silvia", "SilviaUpdated", "Test-Player"] },
      },
    });
  });
  afterEach(async () => {
    await prisma.player.deleteMany({
      where: {
        name: { in: ["Silvia", "SilviaUpdated", "Test-Player"] },
      },
    });
  });

  describe("createPlayer", () => {
    it("should create a new player", async () => {
      const req = {
        body: {
          name: "Silvia",
          register_date: new Date(),
        },
      } as unknown as Request;
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      } as unknown as Response;
      await playerController.createPlayer(req, res);
      expect(res.status).toBeCalledWith(201);
      expect(res.json).toBeCalledWith(
        expect.objectContaining({
          name: "Silvia",
          register_date: expect.any(Date),
        })
      );
    });

    it("should return 400 if the request body is invalid", async () => {
      const req = {
        body: {},
      } as unknown as Request;
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      } as unknown as Response;
      await playerController.createPlayer(req, res);
      expect(res.status).toBeCalledWith(400);
      expect(res.json).toBeCalledWith({ message: "Missing required fields" });
    });

    it("should return 400 if the name is not a string", async () => {
      const req = {
        body: {
          name: 123,
          register_date: new Date(),
        },
      } as unknown as Request;
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      } as unknown as Response;
      await playerController.createPlayer(req, res);
      expect(res.status).toBeCalledWith(400);
      expect(res.json).toBeCalledWith({
        message: "Invalid name. It should be a string",
      });
    });
  });

  describe("updatePlayer", () => {
    it("should update an existing player", async () => {
      const player = await prisma.player.create({
        data: {
          name: "Silvia",
          register_date: new Date(),
        },
      });

      const req = {
        params: { id: player.id },
        body: {
          name: "SilviaUpdated",
        },
      } as unknown as Request;
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      } as unknown as Response;
      await playerController.updatePlayer(req, res);
      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith(
        expect.objectContaining({
          name: "SilviaUpdated",
          register_date: expect.any(Date),
        })
      );
    });

    it("should return 404 if player is not found", async () => {
      const req = {
        params: { id: 99999 },
        body: {
          name: "SilviaUpdated",
        },
      } as unknown as Request;
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      } as unknown as Response;
      await playerController.updatePlayer(req, res);
      expect(res.status).toBeCalledWith(404);
      expect(res.json).toBeCalledWith({ message: "Player not found" });
    });

    it("should return 400 if the request body is invalid", async () => {
      const player = await prisma.player.create({
        data: {
          name: "Silvia",
          register_date: new Date(),
        },
      });

      const req = {
        params: { id: player.id },
        body: {},
      } as unknown as Request;
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      } as unknown as Response;
      await playerController.updatePlayer(req, res);
      expect(res.status).toBeCalledWith(400);
      expect(res.json).toBeCalledWith({ message: "No fields to update" });
    });
  });

  describe("getAllPlayers", () => {
    // it("should return 404 if no players are found", async () => {
    //   const req = {} as Request;
    //   const res = {
    //     status: vi.fn().mockReturnThis(),
    //     json: vi.fn(),
    //   } as unknown as Response;
    //   await playerController.getAllPlayers(req, res);
    //   expect(res.status).toBeCalledWith(404);
    //   expect(res.json).toBeCalledWith({ message: "No players found" });
    // });

    it("should return 200 if players are found", async () => {
      await prisma.player.create({
        data: {
          name: "Silvia",
          register_date: new Date(),
        },
      });

      const req = {} as Request;
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      } as unknown as Response;
      await playerController.getAllPlayers(req, res);
      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Silvia",
            register_date: expect.any(Date),
          }),
        ])
      );
    });
  });

  describe("getPlayerById", () => {
    it("should return 200 if a player is found", async () => {
      const player = await prisma.player.create({
        data: {
          name: "Silvia",
          register_date: new Date(),
        },
      });

      const req = { params: { id: player.id } } as unknown as Request;
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      } as unknown as Response;
      await playerController.getPlayerById(req, res);
      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith(
        expect.objectContaining({
          name: "Silvia",
          register_date: expect.any(Date),
        })
      );
    });

    it("should return 404 if player is not found", async () => {
      const req = { params: { id: 88888 } } as unknown as Request;
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      } as unknown as Response;
      await playerController.getPlayerById(req, res);
      expect(res.status).toBeCalledWith(404);
      expect(res.json).toBeCalledWith({ message: "Player not found" });
    });
  });
  describe("get player by name", async () => {
    it("should return 200 if a player is found", async () => {
      const player = await prisma.player.create({
        data: {
          name: "Silvia",
          register_date: new Date(),
        },
      });
      const req = { params: { name: player.name } } as unknown as Request;
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      } as unknown as Response;
      await playerController.getPlayerByName(req, res);
      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith(
        expect.objectContaining({
          name: "Silvia",
          register_date: expect.any(Date),
        })
      );
    });

    it("should return 404 if player is not found", async () => {
      const req = { params: { name: "Test-Player" } } as unknown as Request;
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      } as unknown as Response;
      await playerController.getPlayerByName(req, res);
      expect(res.status).toBeCalledWith(404);
      expect(res.json).toBeCalledWith({ message: "Player not found" });
    });

    it("should return 400 if the name is missing", async () => {
      const req = { params: { name: "" } } as unknown as Request;
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      } as unknown as Response;
      await playerController.getPlayerByName(req, res);
      expect(res.status).toBeCalledWith(400);
      expect(res.json).toBeCalledWith({
        message: "Missing required field",
      });
    });
  });
});
