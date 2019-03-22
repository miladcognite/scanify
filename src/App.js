import React, { Component } from 'react';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSave, faQuestion, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import WebcamCapture from './WebcamCapture';
import './App.css';

library.add(faSave, faQuestion, faWindowClose)

class App extends Component {
    render() {

        let width = 640 * 0.4
        let height = 480 * 0.4

        console.log("[INFO] Camera dimensions", width, "X", height)
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