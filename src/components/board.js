import React, { Component } from 'react'
import BoardCell from './board-cell'

export default class Board extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const tableStyle = {
            color: 'black',
            'borderSpacing': '0px'
        }
        return (
            <table className="Board" style={tableStyle}>
                <tbody>
                    {Array.apply(0, Array(this.props.game.height)).map((x, j) =>
                        <tr key={j}>
                            {Array.apply(0, Array(this.props.game.width)).map((y, i) =>
                                <BoardCell 
                                    x={i} 
                                    y={j}
                                    key={j*this.props.game.width + i}
                                    players={this.props.game.players}
                                    symbol={this.props.game.players[this.props.game.board[j * this.props.game.width + i]]} 
                                    updateBoard={this.props.updateBoard.bind(this)}
                                    color={this.getColor(i, j)}/>
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }

    getColor(x, y) {
        let cellValue = this.props.game.board[y * this.props.game.width + x]
        let color = 'black'
        let overrideColor = false
        for (var i = 0; i < this.props.game.winningMoves.length; i++) {
            if (x == this.props.game.winningMoves[i].x &&
                y == this.props.game.winningMoves[i].y) {
                    overrideColor = true
                    color = 'green'
                }
        }

        if (!overrideColor && cellValue == 1) {
            color = 'red'
        }
        else if (!overrideColor && cellValue == 2) {
            color = 'blue'
        }

        return color
    }
}