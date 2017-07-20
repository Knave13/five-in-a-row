import Bot from '../classes/bot'
import Random from '../classes/random'
import Helper from '../classes/board-helper'

export default class StretchBot extends Bot {
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
        return 'Stretch-Bot'
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
        return 'S'
    }

    get alternateSymbol() {
        return 's'
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

        for (var j = 1; j < height - 1; j++) {
            for (var i = 1; i < width - 1; i++) {
                let index = j * width + i
                if (board[index] == 0) {
                    let adjacentCell = Helper.checkAdjacent2(board, width, height, i, j, this.id)
                    if (adjacentCell == 1) {
                        // found myself, add to list
                        cells.push({x: i, y: j, index: index})
                    }
                    else if (adjacentCell == 2) {
                        otherCells.push({x: i, y: j, index: index})
                    }
                }
            }
        }
        // if we have any existing pieces we will select one of them
        if (cells.length > 0) {
            return cells
        }

        // otherwise we have to pick a spot adjacent to the opponents, this will happen on the first move or when all
        // pieces are land locked
        return otherCells
    }
}