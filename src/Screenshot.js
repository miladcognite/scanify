import React, { Component } from 'react';
import logo from './images/image_icon.png'

class Screenshot extends Component {

    render() {
        return (
            < img
                ref="image"
                src={this.props.src ? this.props.src : logo}
                alt=""
                style={{
                    visibility: "visible",
                    display: "block",
                    width: this.props.width,
                    height: this.props.height,
                }}
            />
        );
    }
}

Screenshot.defaultProps = { width: 400, height: 400 };
export default Screenshot;