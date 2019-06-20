import React, { Component } from 'react';
import './Mic.css';
import RecordButton from './RecordButton';
import RecordedAudio from './RecordedAudio';

class Mic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      stream: [],
      audioChunks: [],
      recordedAudio:
        { src: '', controls: true, autoplay: false }
      }
  this.startRecording = this.startRecording.bind(this)
  this.stopRecording = this.stopRecording.bind(this)
  }


  startRecording(evt){
    this.setState({ recording: true });
    navigator.mediaDevices.getUserMedia({audio: true, video: false})
    .then(stream => {this.handleStream(stream)})
  }

  handleStream(stream) {
    let rec = new MediaRecorder(stream);
    this.setState({ stream: rec })
    rec.start()
    let audioChunks = []
    rec.ondataavailable = e => {
      audioChunks.push(e.data);
      console.log('running on data available')
      if(rec.state === 'inactive') {
        console.log('in if statement')
        let blob = new Blob(audioChunks,{type: 'audio/mpeg-3'});
        console.log('blob is', blob)
      }
    }
    console.log('in handle stream', stream, rec, audioChunks)
}

  stopRecording(evt){
    this.setState({ recording: false });

    console.log('inside stop recording', this.state.recording)
  }

  render() {
    return (
      <div>
        <div>
          <h1>Mic Recorder Thingy</h1>
        </div>
        < RecordButton
          startRecording={this.startRecording}
          stopRecording={this.stopRecording}
          recording={this.state.recording}
        />
        < RecordedAudio
          src={this.state.recordedAudio.src}
          controls={this.state.recordedAudio.controls}
          autoplay={this.state.recordedAudio.autoplay}
        />
      </div>
     );
  }
}

export default Mic;
