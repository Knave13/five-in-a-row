import Bot from '../classes/bot'
import Random from '../classes/random'
import Helper from '../classes/board-helper'

export default class BlockBot extends Bot {
    constructor(props) {
        super(props);

        let id = props.id || 0
        this.id = id
        Random.init(1313)
    }

    set botId(id) {
        this.id = id
    }

    get botId() {
        return this.id || 0
    }

    get botName() {
        return 'Block-Bot'
    }

    nextMove(game) {
        let cells = this.buildCandidateCells(game.board, game.width, game.height)
        let index = Random.integer(1, cells.length) - 1

        return Promise.resolve({x: cells[index].x, y: cells[index].y, log: 'Moves: ' + game.board.moveCount})
    }

    get activeSymbol() {
        return this.symbol
    }
    
    set activeSymbol(symbol) {
        this.symbol = symbol;
    }

    get primarySymbol() {
        return 'B'
    }

    get alternateSymbol() {
        return 'b'
    }

    get strategy() {
        return 'Player: ' + this.id + ' - This bot will randomly select a move that is adjacent to an existing friendly piece. This will result in friendly pieces being grouped together.'
    }

    get version() {
        return 'v0.1.0'
    }

    // returns a collection of adjacent cells of your own pieces
    // or returns a collection of cells adjacent to any piece
    buildCandidateCells(board, width, height) {
        let cells = []
        let otherCells = []
        let enemy = this.id == 1 ? 2 : 1
        let maxLength = 0
        for (var j = 1; j < height - 1; j++) {
            for (var i = 1; i < width - 1; i++) {
                let index = j * width + i
                if (board[index] == 0) {
                    let length = Helper.getLength(board, width, height, i, j, enemy)
                    if (length > maxLength) {
                        cells = []
                        maxLength = length
                        cells.push({x: i, y: j, index: index})
                    }
                    else if (length > 0 && length == maxLength) {
                        cells.push({x: i, y: j, index: index})
                    }
                }
            }
        }
        
        return cells
    }
}