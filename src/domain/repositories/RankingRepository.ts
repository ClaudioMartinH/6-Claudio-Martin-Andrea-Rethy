import { Ranking } from "../entities/Ranking.js";
export interface RankingRepository {
  getRanking(): Promise<Ranking[]>;
  getLoser(): Promise<Ranking>;
  getWinner(): Promise<Ranking>;
}
