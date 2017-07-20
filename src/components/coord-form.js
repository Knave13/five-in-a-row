import React, { Component } from 'react'

export default class CoordForm extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const divStyle = {
            'paddingTop': '10px',
            'paddingBottom': '10px'
        }
        return (
            <div style={divStyle}>
                <button onClick={this.props.clearBoard}>Clear</button>
                <button onClick={this.props.nextMove.bind(this)}>Next Move</button>
                <button onClick={this.props.startGame.bind(this)}>Start Game</button>
            </div>
        )
    }

}