import { Game } from "../entities/Game.js";
export interface GameRepository {
    getGamesForPlayer(playerId: Number): Promise<Game[]>;
    createGame(game: Game): Promise<Game>;
    deleteGames(playerId: Number): Promise<number>;
}