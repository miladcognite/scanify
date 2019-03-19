import React, { Component } from 'react';
import Webcam from "react-webcam";
import JSZip from 'jszip'
import saveAs from 'file-saver'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

    componentDidMount() {
        this.setState({
            previousImageSrc: null,
        })

        requestAnimationFrame(this.tick);


    }

    tick = () => {
        if (this.webcam.getCanvas()) {
            var result = findMatches(
                this.props.width,
                this.props.height,
                this.webcam.getCanvas().getContext('2d'),
                this.refs.cameraCanvas.getContext('2d'),
                this.refs.imageCanvas.getContext('2d'),
            )

            this.checkCount(result.count, result.num_matches)
        }
        requestAnimationFrame(this.tick);
    };

    checkCount = (keypoints, matchCount) => {

        let lowCount = 50
        let highCount = 110

        if (this.state.previousImageSrc) {
            if (matchCount < lowCount) {
                if (this.state.bordercolor !== "#990000") {
                    console.log("[Warning] Take new picture!", matchCount)
                    this.setState({
                        bordercolor: "#990000"
                    })
                }


            } else if (matchCount > highCount) {
                if (this.state.bordercolor !== "#76ee00") {
                    console.log("[INFO] It's ok, keep moving!", matchCount)
                    this.setState({
                        bordercolor: "#76ee00"
                    })
                }
            }
            else {
                if (this.state.bordercolor !== "#e67e22") {
                    console.log("[INFO] Slow down!", matchCount)
                    this.setState({
                        bordercolor: "#e67e22"
                    })

                }
            }
        }
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
        console.log("[INFO] Saving image", this.state.previousImageSrc)

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

    addImage = () => {
        var newArray = this.state.images.slice();
        newArray.push(this.state.previousImageSrc);
        this.setState({ images: newArray })
    }


    render() {
        const style = {
            borderColor: this.state.bordercolor ? this.state.bordercolor : "#fff",
        };
        const videoConstraints = {
            facingMode: "left",
            width: this.props.width,
            height: this.props.height,
            screenshotQuality: 1,

            deviceId: "OStgA83clORqptsn1sqH+Y36bvd2C2ZjlrLVvVjiWto="
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
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                            onUserMedia={this.onUserMedia}
                            style={{ visibility: 'hidden' }} // add check
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
                        <Help />

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

WebcamCapture.defaultProps = { limit: 30, padding: 0 };

export default WebcamCapture;