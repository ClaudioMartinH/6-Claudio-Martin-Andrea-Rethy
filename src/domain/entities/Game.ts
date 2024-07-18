import { PlayerGame } from "./PlayerGame.js"

export class Game {
    public id: Number
    public played_at: Date
    public playerGames: PlayerGame[] = []

    constructor(id: Number, played_at: Date, playerGames: PlayerGame[]){
        this.id = id
        this.played_at = played_at
        this.playerGames = playerGames
    }
}