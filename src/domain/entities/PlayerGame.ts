import { Player } from "./Player.js";
import { Game } from "./Game.js";

export class PlayerGame {
    id: Number;
    playerId: Number;
    gameId: Number;
    dice1Result: Number;
    dice2Result: Number;
    overallResult: String;
    player?: Player;
    game?: Game;
  
    constructor(
      id: Number,
      playerId: Number,
      gameId: Number,
      dice1Result: Number,
      dice2Result: Number,
      overallResult: String,
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
  