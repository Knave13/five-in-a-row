import Bot from '../classes/bot'

export default class Bot2 extends Bot {
    constructor(props) {
        super(props);

        let id = props.id || 0
        this.id = 0
    }

    set botId(id) {
        this.id = id
    }

    get botId() {
        return this.id || 0
    }

    get botName() {
        return 'Scott-Bot'
    }

    nextMove(board, callback) {
        callback(0, 0)
    }

    get activeSymbol() {
        return this.symbol
    }
    
    set activeSymbol(symbol) {
        this.symbol = symbol
    }

    get primarySymbol() {
        return 'x'
    }

    get alternateSymbol() {
        return 's'
    }

    get strategy() {
        return 'Player: ' + this.id + ' - This is Scott\'s bot of amazingness'
    }

    get version() {
        return 'v0.1.0'
    }
}