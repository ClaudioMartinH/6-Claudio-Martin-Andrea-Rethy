import { Player } from "../entities/Player.js";
export interface PlayerRepository {
  getAllPlayers(): Promise<Player[]>;
  getPlayerById(id: Number): Promise<Player | null>;
  getPlayerByPlayerName(name: string): Promise<Player | null>;
  createPlayer(player: Player): Promise<Player>;
  updatePlayer(id: Number): Promise<void>;
}
