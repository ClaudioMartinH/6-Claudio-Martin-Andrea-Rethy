import { PlayerGame } from "../entities/PlayerGame.js";
export interface GameRepository {
    getGamesForPlayer(playerId: Number): Promise<PlayerGame[]>;
    createGame(playerId: Number): Promise<PlayerGame>;
    deleteGame(playerId: Number): Promise<void>;
}