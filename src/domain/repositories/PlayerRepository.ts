import { Player } from "../entities/Player.js";
export interface PlayerRepository {
    getAllPlayers(): Promise<Player[]>
    getPlayerById(id: Number): Promise<Player | null>
    addPlayer(player: Player): Promise<Player>
    updatePlayer(player: Player): Promise<void>
    deletePlayerById(id: Number): Promise<void>
}