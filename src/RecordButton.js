import React, { Component } from 'react';
import './Mic.css';

class RecordButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    this.props.recording
      ? this.props.stopRecording()
      : this.props.startRecording();
  }

  render() {
    let buttonState = this.props.recording ? 'Stop' : 'Record';
    let buttonIcon = this.props.recording ? 'fas fa-stop' : 'fas fa-microphone'
    return (
      <button
        id='record'
        className={buttonState}
        onClick={this.handleClick}
      >
        <i className={buttonIcon}></i>
      </button>
     );
  }
}

export default RecordButton;
