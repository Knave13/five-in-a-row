import Bot from '../classes/bot'

export default class Bot1 extends Bot {
    constructor(props) {
        super();

        let id = props.id || 0

        this.id = id
        this.symbol = ''
    }

    get botId() {
        return this.id || 0
    }
    
    get botName() {
        return 'Ben-Bot'
    }

    nextMove(board, callback) {
        callback(0, 0)
    }

    set activeSymbol(value) {
        this.symbol = value
    }
    
    get activeSymbol() {
        return this.symbol
    }

    get primarySymbol() {
        return 'x'
    }

    get alternateSymbol() {
        return 'b'
    }

    get strategy() {
        return 'Player: ' + this.id + ' - This is Ben\'s bot of freightening brilliance'
    }

    get version() {
        return 'v0.1.0'
    }
}