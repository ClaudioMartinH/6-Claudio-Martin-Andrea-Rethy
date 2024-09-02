import { Game } from "../entities/Game.js";
export interface GameRepository {
    getGamesForPlayer(playerId: Number): Promise<Game[]>;
    createGame(playerId: Number): Promise<Game>;
    deleteGame(playerId: Number): Promise<void>;
}