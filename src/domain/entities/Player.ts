import { Game } from "./Game.js";

export class Player {
  public id: Number;
  public name: String;
  public register_date: Date | undefined;
  public games: Game[] = [];

  constructor(id: Number, name: String, register_date: Date | undefined) {
    this.id = id;
    this.name = name;
    this.register_date = register_date;
  }
}
