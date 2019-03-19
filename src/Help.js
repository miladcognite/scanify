import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import logo from './images/help.png'
class Help extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    openModal() {
        this.setState({
            visible: true
        });
    }

    closeModal() {
        this.setState({
            visible: false
        });
    }

    render() {
        return (
            <div>
                <FontAwesomeIcon
                    className="helpButton"
                    icon="question"
                    onClick={() => this.openModal()}
                    style={{ visibility: 'visible' }}
                />
                <Modal
                    visible={this.state.visible ? this.state.visible : false}
                    style={{
                        width: this.props.width,
                        height: this.props.height,
                    }}
                    // effect="fadeInUp"
                    onClickAway={() => this.closeModal()}>
                    <div className="Helper"
                        style={{ visibility: this.state.visible ? this.state.visible : false }}>
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
                        <FontAwesomeIcon
                            className="closeButton"
                            icon="window-close"
                            onClick={() => this.closeModal()}
                            style={{ visibility: 'visible' }}
                        />
                    </div>
                </Modal>
            </div >
        );
    }
}


export default Help