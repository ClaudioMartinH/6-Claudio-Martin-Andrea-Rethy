import { Player } from "./Player.js"
export class Ranking {
    public id: Number
    public playerId: Number
    public totalGames: Number
    public totalWin: Number
    public totalLost: Number
    public winPercentage: Number
    public player: Player
    constructor(id: Number, playerId: Number, totalGames: Number, totalWin: Number, totalLost: Number, winPercentage: Number, player: Player){
        this.id = id
        this.playerId = playerId
        this.totalGames = totalGames
        this.totalWin = totalWin
        this.totalLost = totalLost
        this.winPercentage = winPercentage
        this.player = player
    }
}