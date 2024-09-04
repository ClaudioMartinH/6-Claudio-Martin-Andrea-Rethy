import { describe, beforeEach, afterEach, expect, it } from "vitest";
import { PlayerService } from "../../infrastructure/services/playerService.js";
import { cleanDatabase } from "../../db.js";

const playerService = new PlayerService();

describe("PlayerService", () => {
  beforeEach(async () => {
    await cleanDatabase();
  });
  afterEach(async () => {
    await cleanDatabase();
  });
  it("should return all players", async () => {
    const players = await playerService.getAllPlayers();
    expect(players).toHaveLength(0);
  });
  it("should create a new player", async () => {
    const name = "Silvia";
    const newPlayer = await playerService.createPlayer({ name });
    expect(newPlayer.id).toBeGreaterThan(0);
    expect(newPlayer.name).toBe(name);
    const allPlayers = await playerService.getAllPlayers();
    expect(allPlayers).toHaveLength(1);
  });
  it("should update an existing player", async () => {
    const name = "Silvia";
    const newPlayer = await playerService.createPlayer({ name });
    const updatedPlayer = await playerService.updatePlayer(newPlayer.id, {
      name: "Silvia Updated",
    });
    expect(updatedPlayer).not.toBeNull();
    expect(updatedPlayer?.name).toBe("Silvia Updated");
    const allPlayers = await playerService.getAllPlayers();
    expect(allPlayers).toHaveLength(1);
    expect(allPlayers[0].name).toBe("Silvia Updated");
  });
  it("should find an user by id", async () => {
    const name = "Silvia";
    const newPlayer = await playerService.createPlayer({ name });
    const foundPlayer = await playerService.getPlayerById(newPlayer.id);
    expect(foundPlayer).not.toBeNull();
    expect(foundPlayer?.name).toBe(name);
  });
});
