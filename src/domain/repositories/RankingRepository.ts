import { Ranking } from "../entities/Ranking.js";
import { Player } from "../entities/Player.js";
export interface RankingRepository {
    getRanking(): Promise<Ranking[]>;
    getLoser(): Promise<Player>;
    getWinner(): Promise<Player>;
}