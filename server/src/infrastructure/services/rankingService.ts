import { RankingRepositoryImpl } from "../repositories/rankingRepositoryImpl.js";
import { Ranking } from "@prisma/client";

export class RankingService {
  private rankingRepository: RankingRepositoryImpl;
  constructor() {
    this.rankingRepository = new RankingRepositoryImpl();
  }

  async getRanking(): Promise<Ranking[]> {
    return await this.rankingRepository.getRanking();
  }

  async getLoser(): Promise<Ranking | null> {
    return await this.rankingRepository.getLoser();
  }

  async getWinner(): Promise<Ranking | null> {
    return await this.rankingRepository.getWinner();
  }
}
