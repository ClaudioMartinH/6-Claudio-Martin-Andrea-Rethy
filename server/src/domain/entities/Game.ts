import { Player } from "./Player.js";

export class Game {
  id: Number;
  playerId: Number;
  dice1Result: Number;
  dice2Result: Number;
  overallResult: String;
  player?: Player;

  constructor(
    id: Number,
    playerId: Number,
    dice1Result: Number,
    dice2Result: Number,
    overallResult: String,
    player?: Player
  ) {
    this.id = id;
    this.playerId = playerId;
    this.dice1Result = dice1Result;
    this.dice2Result = dice2Result;
    this.overallResult = overallResult;
    this.player = player;
  }
}
