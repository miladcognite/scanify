import React, { Component } from 'react';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSave, faQuestion, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import WebcamCapture from './WebcamCapture';
import './App.css';

library.add(faSave, faQuestion, faWindowClose)
// let width = parseInt(window.outerWidth * 0.4)
// let height = parseInt(window.outerHeight * 0.5)

let width = 640
let height = 480

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <WebcamCapture width={width} height={height} />
                </div>
            </div>
        );
    }
}

export default App;