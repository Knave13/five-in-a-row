import React from 'react'
import Header from './components/header'
import App from './components/app'
import { render } from 'react-dom'

render(
    (<div>
        <Header />
        <br />
        <br /> 
        <App />
    </div>),
    document.getElementById('app')
)

console.log('We should have some components loading and rendering');