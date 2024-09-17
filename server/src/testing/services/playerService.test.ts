import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { PlayerService } from "../../infrastructure/services/playerService.js";
import { prisma } from "../../db.js";

const playerService = new PlayerService();

describe("PlayerService", () => {
  beforeEach(async () => {
    await prisma.player.deleteMany({
      where: {
        name: { in: ["Test-1", "Test-2", "Test-2 Updated", "Test-3"] },
      },
    });
  });
  afterEach(async () => {
    await prisma.player.deleteMany({
      where: {
        name: { in: ["Test-1", "Test-2", "Test-2 Updated", "Test-3"] },
      },
    });
  });

  it("should return all players", async () => {
    const players = await playerService.getAllPlayers();
    expect(players).toBeInstanceOf(Array);
    expect(players.length).toBeGreaterThanOrEqual(0);
  });

  it("should create a new player", async () => {
    const name = "Test-1";
    const newPlayer = await playerService.createPlayer({ name });
    expect(newPlayer.id).toBeGreaterThan(0);
    expect(newPlayer.name).toBe(name);

    const allPlayers = await playerService.getAllPlayers();
    expect(allPlayers).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: "Test-1" })])
    );
  });

  it("should update an existing player", async () => {
    const newPlayer = await playerService.createPlayer({ name: "Test-2" });
    const updatedPlayer = await playerService.updatePlayer(newPlayer.id, {
      name: "Test-2 Updated",
    });

    expect(updatedPlayer).not.toBeNull();
    expect(updatedPlayer?.name).toBe("Test-2 Updated");

    const allPlayers = await playerService.getAllPlayers();
    expect(allPlayers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "Test-2 Updated" }),
      ])
    );
  });

  it("should find a user by id", async () => {
    const name = "Test-3";
    const newPlayer = await playerService.createPlayer({ name });

    const foundPlayer = await playerService.getPlayerById(newPlayer.id);
    expect(foundPlayer).not.toBeNull();
    expect(foundPlayer?.name).toBe(name);
  });
  it("should find a player by name", async () => {
    const name = "Test-3";
    await playerService.createPlayer({ name });
    const foundPlayer = await playerService.getPlayerByName(name);
    expect(foundPlayer).not.toBeNull();
    expect(foundPlayer?.name).toBe(name);
  });
});
