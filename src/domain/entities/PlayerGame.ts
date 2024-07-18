import { Player } from "./Player.js";
import { Game } from "./Game.js";

export class PlayerGame {
    id: number;
    playerId: number;
    gameId: number;
    dice1Result: number;
    dice2Result: number;
    overallResult: string;
    player?: Player;
    game?: Game;
  
    constructor(
      id: number,
      playerId: number,
      gameId: number,
      dice1Result: number,
      dice2Result: number,
      overallResult: string,
      player?: Player,
      game?: Game
    ) {
      this.id = id;
      this.playerId = playerId;
      this.gameId = gameId;
      this.dice1Result = dice1Result;
      this.dice2Result = dice2Result;
      this.overallResult = overallResult;
      this.player = player;
      this.game = game;
    }
  }
  