import { Game } from "./Game.js"

export class Player {
    public id: Number
    public name: String
    public password: String
    public register_date: Date | undefined
    public games: Game[] = []
   
    constructor(id: Number, title: String, password: String, register_date: Date | undefined){
        this.id = id
        this.name = title
        this.password = password
        this.register_date = register_date
        
    }
    
}