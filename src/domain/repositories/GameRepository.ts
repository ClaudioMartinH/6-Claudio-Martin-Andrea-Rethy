import { PlayerGame } from "../entities/PlayerGame.js";
export interface GameRepository {
    getGamesForPlayer(playerId: Number): Promise<PlayerGame[]>;
    createGame(game: PlayerGame): Promise<PlayerGame>;
    deleteGames(playerId: Number): Promise<number>;
}