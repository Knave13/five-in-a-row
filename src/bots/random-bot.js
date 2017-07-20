import Bot from '../classes/bot'
import Random from '../classes/random'
import Helper from '../classes/board-helper'

const offsets = [
     {x:  0, y:  0}
    ,{x:  0, y: -1}
    ,{x:  1, y: -1}
    ,{x:  1, y:  0}
    ,{x:  1, y:  1}
    ,{x:  0, y:  1}
    ,{x: -1, y:  1}
    ,{x: -1, y:  0}
    ,{x: -1, y: -1}
]

export default class RandomBot extends Bot {
    constructor(props) {
        super(props);

        let id = props.id || 0
        this.id = 0
        Random.init(1313)
    }

    set botId(id) {
        this.id = id
    }

    get botId() {
        return this.id || 0
    }
    
    get botName() {
        return 'Random-Bot'
    }

    nextMove(game) {
        let cells = this.buildCandidateCells(game.board, game.width, game.height)
        let index = Random.integer(1, cells.length) - 1
        
        return Promise.resolve({x: cells[index].x, y: cells[index].y, log: 'Moves: ' + game.board.moveCount})
    }

    set activeSymbol(symbol) {
        this.symbol = symbol
    }

    get activeSymbol() {
        return this.symbol
    }
    
    get primarySymbol() {
        return 'R'
    }

    get alternateSymbol() {
        return 'r'
    }

    get strategy() {
        return 'This bot will randomly select a move that is adjacent to an existing piece. No attempt will be made to create lines of pieces.'
    }

    get version() {
        return 'v0.1.0'
    }

    // builds an array of empty cells adjacent to any existing game piece
    buildCandidateCells(board, width, height) {
        let cells = []

        for (var j = 1; j < height - 1; j++) {
            for (var i = 1; i < width - 1; i++) {
                let index = j * width + i
                if (board[index] == 0) {
                    if (Helper.checkAdjacent(board, width, height, i, j, this.id)) {
                        cells.push({x: i, y: j, index: index})
                    }
                }
            }
        }

        return cells
    }


}
