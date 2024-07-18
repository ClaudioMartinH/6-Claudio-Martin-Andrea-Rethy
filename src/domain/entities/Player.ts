import { PlayerGame } from "./PlayerGame.js"

export class Player {
    public id: Number
    public name: String
    public password: String
    public register_date: Date | undefined
    public playerGames: PlayerGame[] = []
   
    constructor(id: Number, title: String, password: String, register_date: Date | undefined){
        this.id = id
        this.name = title
        this.password = password
        this.register_date = register_date
        
    }
    
}
// import { PlayerGame, Ranking } from "@prisma/client"

// export class Player {
//     id: Number
//     name: String
//     password: String
//     playerGames: PlayerGame[]
//     ranking: Ranking

//     constructor(id: Number, title: String, password: String, ranking: Ranking, playerGames: PlayerGame[]){
//         this.id = id
//         this.name = title
//         this.password = password
//         this.ranking = ranking
//         this.playerGames = playerGames
//     }
    
// }