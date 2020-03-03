import React from 'react'
import './App.css'
import cover from './assets/hemp.jpg'
import track1 from './assets/ODISEA.mp3'
import track2 from './assets/IFISAWYOU.mp3'

class App extends React.Component {
  state = {
    audioIndex: 0
  }

  playAudio = () => {
    const audioEl = document.getElementsByClassName('audio-element')[this.state.audioIndex]
    audioEl.play()
  }

  stopAudio = () => {
    const audioEl = document.getElementsByClassName('audio-element')[this.state.audioIndex]
    audioEl.pause()
    audioEl.load()
  }

  prevAudio = async () => {
    const { audioIndex } = this.state
    const currentAudio = document.getElementsByClassName('audio-element')[audioIndex]
    if (audioIndex > 0 && currentAudio.paused) {
      await this.stopAudio()
      const newAudioIndex = audioIndex - 1
      this.setState({
        audioIndex: newAudioIndex
      })
    } else if (audioIndex > 0) {
      await this.stopAudio()
      const newAudioIndex = audioIndex - 1
      this.setState({
        audioIndex: newAudioIndex
      })
      this.playAudio()
    }
  }

  nextAudio = async () => {
    const { audioIndex } = this.state
    const audioElements = document.getElementsByClassName('audio-element')
    const currentAudio = audioElements[audioIndex]
    if (audioIndex < (audioElements.length - 1) && currentAudio.paused) {
      await this.stopAudio()
      const newAudioIndex = this.state.audioIndex + 1
      this.setState({
        audioIndex: newAudioIndex
      })
    } else if (audioIndex < (audioElements.length - 1)) {
      await this.stopAudio()
      const newAudioIndex = this.state.audioIndex + 1
      this.setState({
        audioIndex: newAudioIndex
      })
      this.playAudio()
    }
  }

  ended = async () => {
    console.log('ended')
    const newAudioIndex = this.state.audioIndex + 1
    await this.setState({
      audioIndex: newAudioIndex
    })
    this.playAudio()
  }

  render() {
    return (
      <div className="App">
        <img src={cover} alt='cover'/>
        <br/>
        <br/>
        <div>
          <button onClick={this.playAudio}>Play</button>
          <button onClick={this.stopAudio}>Stop</button>
          <button onClick={this.prevAudio}>Prev</button>
          <button onClick={this.nextAudio}>Next</button>
          <p>TRACK {this.state.audioIndex + 1}</p>
        </div>
        <audio controls onEnded={this.ended} className='audio-element'>
          <source src={track1}></source>
        </audio>
        <br/>
        <audio controls onChange={this.handleEnd} className='audio-element'>
          <source src={track2}></source>
        </audio>
      </div>
    )
  }
}

export default App;
