import React, { Component } from 'react';
// import Webcam from "react-webcam";
import JSZip from 'jszip'
import saveAs from 'file-saver'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Webcam from './Webcam';
import Screenshot from './Screenshot';
import { findMatches, train } from './Analyze'
import Help from './Help';

class WebcamCapture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            previousImageSrc: undefined,
            bordercolor: undefined,
            cameraIsReady: false,
            fileCount: -1
        };
        this.tick = this.tick.bind(this);
    }

    setRef = webcam => {
        this.webcam = webcam;
    };


    onUserMedia = () => {
        console.log("[INFO] Camers is ready")
        this.setState({
            cameraIsReady: true
        })

    }

    componentDidMount() {
        this.setState({
            previousImageSrc: null,
        })

        requestAnimationFrame(this.tick);


    }

    addImage = () => {
        var newArray = this.state.images.slice();
        newArray.push(this.state.previousImageSrc);
        this.setState({ images: newArray })
    }

    tick = () => {
        if (this.webcam.getCanvas()) {
            var matchCount = findMatches(
                this.refs.cameraCanvas.getContext('2d'),
                this.webcam.getCanvas()
            )

            this.checkCount(matchCount)
        }
        requestAnimationFrame(this.tick);
    };

    checkCount = (matchCount) => {
        let highCount = 100
        if (this.state.previousImageSrc) {
            let color = matchCount > highCount ? "#76ee00" : this.pickColor(matchCount, highCount)
            this.refs.cameraCanvas.getContext('2d').fillStyle = color
            this.setState({
                bordercolor: color
            })
        }
    }

    pickColor = (matchCount, highCount) => {
        let color2 = [153, 0, 0]
        let color1 = [118, 238, 0]

        var w1 = matchCount / highCount;
        var w2 = 1 - w1;

        var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
        Math.round(color1[1] * w1 + color2[1] * w2),
        Math.round(color1[2] * w1 + color2[2] * w2)];

        return this.rgbToHex(rgb[0], rgb[1], rgb[2]);
    };

    componentToHex = c => {
        var hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };

    rgbToHex = (r, g, b) => {
        return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    };



    capture = () => {
        const previousImageSrc = this.webcam.getScreenshot()
        this.setState(
            {
                previousImageSrc: previousImageSrc,
                fileCount: this.state.fileCount + 1
            },
            this.compare
        );
    };

    compare = () => {
        train(
            this.refs.imageCanvas.getContext('2d'),
            this.props.width,
            this.props.height
        )
        this.addImage()
    }

    saveImages = () => {
        console.log("[INFO] Saving image")

        var zip = new JSZip();
        var imageFolder = zip.folder("images");

        for (let i = 0; i < this.state.images.length; i++) {
            var fileName = "img_" + i + ".jpg"
            let imageSrc = this.state.images[i].split(';base64,').pop()
            imageFolder.file(fileName, imageSrc, { base64: true });
        }

        zip.generateAsync({ type: "blob" })
            .then(function (content) {
                saveAs(content, "images.zip");
            });
    }

    render() {
        const style = {
            borderColor: this.state.bordercolor ? this.state.bordercolor : "#fff",
            width: this.props.width,
            height: this.props.height
        };
        const videoConstraints = {
            facingMode: "environment",
            screenshotQuality: 1,
            // minScreenshotWidth: 1920,
            // minScreenshotHeight: 1080,
        };
        return (

            <div className="App-main">
                <div className="container">
                    <div className="wrapper" style={style}>
                        <canvas ref="cameraCanvas"
                            width={this.props.width}
                            height={this.props.height}
                        />
                        <Webcam
                            id="webcam"
                            audio={false}
                            ref={this.setRef}
                            width={this.props.width}
                            height={this.props.height}
                            scale={this.props.scale}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                            onUserMedia={this.onUserMedia}
                            style={{
                                visibility: 'visible',
                            }}
                        />
                        <button
                            className="btn"
                            onClick={this.capture}
                            style={{ visibility: this.state.cameraIsReady ? 'visible' : 'hidden' }}
                        />

                        <FontAwesomeIcon
                            className="saveButton"
                            icon="save"
                            onClick={this.saveImages}
                            style={{ visibility: this.state.previousImageSrc ? 'visible' : 'hidden' }}
                        />
                        <Help
                            width={this.props.width}
                            height={this.props.height}
                        />

                    </div>
                </div>

                <div className="container" style={{ marginLeft: "2%" }}>
                    <div className="wrapper" >
                        <canvas ref="imageCanvas"
                            width={this.props.width}
                            height={this.props.height}

                        />
                        <Screenshot
                            ref="previous"
                            name="Previous Image"
                            src={this.state.previousImageSrc}
                            width={this.props.width}
                            height={this.props.height}
                        />

                    </div>
                </div>
            </div >

        );
    }
}

WebcamCapture.defaultProps = { scale: 6 };

export default WebcamCapture;