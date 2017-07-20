import React, { Component } from 'react'
import Board from './board'
import CoordForm from './coord-form'
import Players from '../classes/players'
import Helper from '../classes/board-helper'

const moves = []
const boardWidth = 25
const boardHeight = 25
const startPosX = 12
const startPoxY = 12
const startPos = startPoxY * boardWidth + startPosX

let game = {
    width: boardWidth,
    height: boardHeight,
    logs: [],
    board: [],
    moves: [],
    players: ['', 'x', 'o', '.'],
    winningMoves: [],
    moveCount: 0
};

const bots = new Players()
const maxMoves = 250
//
//  8 1 2
//  7 0 3
//  6 5 4
//
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

export default class App extends Component {
    constructor(props) {
        super(props)
        bots.loadPlayerOne(1)
        bots.loadPlayerTwo(1)

        this.state = {
            game: game,
            bots: bots,
            playerOne: bots.getPlayer(0),
            playerTwo: bots.getPlayer(1),
            currentPlayer: 1,
            gameOver: false,
            moveCount: 0,
            log: '',
            delay: 300
        }

        this.initializeBoard()
        this.state.game.players[1] = this.state.playerOne.primarySymbol
        this.state.game.players[2] = this.state.playerTwo.primarySymbol == this.state.playerOne.primarySymbol ? this.state.playerTwo.alternateSymbol : this.state.playerTwo.primarySymbol
    }
    render() {
        const winnerText = this.state.gameOver ? 'We have a winner:' + this.state.currentPlayer : '-'
        const moveCountText = 'Moves: ' + this.state.moveCount
        return (
            <div className="main">
                <div>
                    Player Count: {this.state.bots.getPlayerCount()}
                </div>
                <div>
                    Helper Version: {Helper.version}
                </div>
                <div>
                    {this.state.playerOne.botName} ({this.state.game.players[1]}) vs. {this.state.playerTwo.botName} ({this.state.game.players[2]})
                </div>
                <div>
                    CurrentPlayer: {this.state.currentPlayer}
                </div>
                <div>
                    {winnerText}
                    <br/>
                    {moveCountText}
                    <br/>
                    {this.state.log}
                </div>
                <div className="boardContainter">
                    <CoordForm 
                        clearBoard={this.clearBoard.bind(this)}
                        nextMove={this.nextMove.bind(this)}
                        startGame={this.startGame.bind(this)}/>
                    <Board
                        game={this.state.game}
                        updateBoard={this.updateBoard.bind(this)}
                        players={this.state.players}
                    />
                </div>
            </div>
        )
    }

    updateBoard(x, y) {
        let index = parseFloat(y) * boardWidth + parseFloat(x)
        let value = this.state.game.board[index]
        
        if (value === 3) {
            return
        }
        else if (value === 2) {
            value = 0
        }
        else {
            value = value + 1
        }
        this.state.game.board[index] = value
        this.setState({game: this.state.game})
    }

    makeMove(x, y, log) {
        let index = parseFloat(y) * boardWidth + parseFloat(x)
        let value = this.state.game.board[index]
        let moveCount = this.state.moveCount
        if (this.state.currentPlayer == 1) {
            moveCount++
        }
        this.state.game.board[index] = this.state.currentPlayer
        this.state.game.moveCount = moveCount;
        let currentPlayer = this.state.currentPlayer == 1 ? 2 : 1
        this.setState({
            game: this.state.game,
            currentPlayer: currentPlayer,
            moveCount: moveCount,
            log: log
        })
    }

    initializeBoard() {
        let board = new Array(boardWidth * boardHeight).fill(0);
        for (var i = 0; i < boardWidth; i ++) {
            board[i] = 3
            board[(boardHeight - 1) * boardWidth + i] = 3
        }
        for (var j = 1; j < boardHeight; j++) {
            board[j * boardWidth] = 3
            board[j * boardWidth - 1] = 3
        }
        board[startPos] = 2
        this.state.game.board = board
    }

    clearBoard() {
        this.stopGame()
        this.initializeBoard()
        this.state.game.winningMoves = []
        this.state.game.moveCount = 0
        this.setState({
            game: this.state.game, 
            gameOver: false, 
            moveCount: 0, 
            currentPlayer: 1,
            log: ''
        })
    }

    startGame() {
        this.clearBoard();
        this.state.isplaying = setInterval(() => {
            this.nextMove()
        }, this.state.delay)
    }

    stopGame() {
        if (this.state.isplaying) {
            clearTimeout(this.state.isplaying)
            this.state.isplaying = null
        }
    }

    async nextMove() {
        let currentPlayer = this.state.currentPlayer
        if (this.state.gameOver) {
            return;

        }

        let result = {};
        if (currentPlayer === 1) {
            result = await this.state.playerOne.nextMove(this.state.game)
        }
        else {
            result = await this.state.playerTwo.nextMove(this.state.game)
        }
        this.makeMove(result.x, result.y, result.log)
        let gameOver = this.checkForWinner()
        this.setState({gameOver: gameOver})
        if (gameOver) {
            this.stopGame()
        }
    }

    checkForWinner() {
        for (var j=1; j<boardHeight-1; j++) {
            for (var i=1; i<boardWidth-1; i++) {
                let index = j * boardWidth + i;
                let cell = this.state.game.board[index]
                if (cell === 0 ||
                    cell === 3) {
                    continue
                }
                // iterate through the offsets to look for a line
                for (var k=1; k<=8; k++) {
                    let done = false
                    let x = i
                    let y = j
                    let length = 1
                    let winningMoves = []
                    winningMoves.push({x,y})
                    while (!done) {
                        x += offsets[k].x
                        y += offsets[k].y
                        let lookIndex = y * boardWidth + x
                        if (cell === this.state.game.board[lookIndex]) {
                            winningMoves.push({x, y})
                            length++
                            if (length === 5) {
                                this.state.game.winningMoves = winningMoves
                                return true
                            }
                        }
                        else {
                            done = true;
                        }
                    }
                }
            }
        }

        return false
    }
 }