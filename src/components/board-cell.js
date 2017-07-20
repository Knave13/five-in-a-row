import React, { Component } from 'react'

export default class BoardCell extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const cellStyle = {
            border: '1px solid CornflowerBlue',
            padding: '2px 2px 2px 2px',
            cursor: 'pointer',
            verticalAlign: 'middle',
            textAlign: 'center',
            width: '18px',
            height: '16px',
            color: this.props.color,
            background: this.props.color == 'green' ? 'yellow' : 'white'
        }
        return (
            <td style={cellStyle} onClick={this.props.updateBoard.bind(this, this.props.x, this.props.y)}>
                {this.props.symbol}
            </td>
        )
    }
}