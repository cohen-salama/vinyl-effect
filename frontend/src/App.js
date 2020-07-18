import React from 'react'
import './App.css'
import cover from './assets/nuncaestuveaqui.jpg'
import buttons from './assets/buttons'
import trackArray from './assets/trackArray'
import trackTitles from './assets/trackTitles'

class App extends React.Component {
  state = {
    currAudioIndex: 0,
    nextAudioIndex: 1,
    currTime: '0:00',
  }

  playAudio = () => {
    const { currAudioIndex, nextAudioIndex } = this.state
    const audioElements = document.getElementsByClassName('audio-element')
    const currentAudio = audioElements[currAudioIndex]
    currentAudio.play()
    if (currAudioIndex < (audioElements.length - 1)) {
      const nextAudioEl = audioElements[nextAudioIndex]
      nextAudioEl.load()
    }
  }

  pauseAudio = () => {
    const currentAudio = document.getElementsByClassName('audio-element')[this.state.currAudioIndex]
    currentAudio.pause()
  }

  stopAudio = () => {
    const currentAudio = document.getElementsByClassName('audio-element')[this.state.currAudioIndex]
    currentAudio.pause()
    currentAudio.load()
    this.setState({
      currTime:'0:00'
    })
  }

  prevAudio = async () => {
    const { currAudioIndex, nextAudioIndex } = this.state
    const currentAudio = document.getElementsByClassName('audio-element')[currAudioIndex]
    if (currAudioIndex > 0 && currentAudio.paused) {
      await this.stopAudio()
      this.setState({
        currAudioIndex: currAudioIndex - 1,
        nextAudioIndex: nextAudioIndex - 1
      })
    } else if (currAudioIndex > 0) {
      await this.stopAudio()
      this.setState({
        currAudioIndex: currAudioIndex - 1,
        nextAudioIndex: nextAudioIndex - 1
      })
      this.playAudio()
    }
  }

  nextAudio = async () => {
    const { currAudioIndex, nextAudioIndex } = this.state
    const audioElements = document.getElementsByClassName('audio-element')
    const currentAudio = audioElements[currAudioIndex]
    if (currAudioIndex < (audioElements.length - 1) && currentAudio.paused) {
      await this.stopAudio()
      this.setState({
        currAudioIndex: currAudioIndex + 1,
        nextAudioIndex: nextAudioIndex + 1
      })
    } else if (currAudioIndex < (audioElements.length - 1)) {
      await this.stopAudio()
      this.setState({
        currAudioIndex: currAudioIndex + 1,
        nextAudioIndex: nextAudioIndex + 1
      })
      this.playAudio()
    }
  }

  secondsToMinutes = (seconds) => Math.floor(seconds / 60) + ':' + ('0' + Math.floor(seconds % 60)).slice(-2)

  handleFlow = async (event) => {
    const { currAudioIndex, nextAudioIndex } = this.state
    const audioElements = document.getElementsByClassName('audio-element')
    if (currAudioIndex < (audioElements.length - 1) &&
       event.target.currentTime > (event.target.duration - 0.3) &&
       event.target.currentTime < (event.target.duration - 0.05)) {
      const currentAudio = audioElements[currAudioIndex]
      currentAudio.controls = false
      await this.setState({
        currTime: '0:00',
        currAudioIndex: currAudioIndex + 1,
        nextAudioIndex: nextAudioIndex + 1
      })
      this.playAudio()
    } else if (event.target.currentTime < (event.target.duration - 0.3)) {
      await this.setState({
        currTime: this.secondsToMinutes(event.target.currentTime)
      })
    }
  }

  render() {
    const { currAudioIndex, currTime } = this.state
    return (
      <div className="App">
        <div className='cover'>
          <img src={cover} className='pic' alt='pic'/>
        </div>
        <br/>
        <div className='controls'>
          <img src={buttons.play} onClick={this.playAudio} className='control' alt='play'></img>
          <img src={buttons.pause} onClick={this.pauseAudio} className='control' alt='pause'></img>
          <img src={buttons.stop} onClick={this.stopAudio} className='control' alt='stop'></img>
          <img src={buttons.prev} onClick={this.prevAudio} className='control' alt='prev'></img>
          <img src={buttons.next} onClick={this.nextAudio} className='control' alt='next'></img>
        </div>
        <div className='display'>
          <h1 className='songTitle'>nunca estuve aquí</h1>
          <h2 className='songName'>{trackTitles[currAudioIndex]}</h2>
          <h3 className='songTime'>{currTime}</h3>
        </div>
        <div className='audios'>
          {trackArray.map((song) => {
            return (
              <audio onTimeUpdate={this.handleFlow} className='audio-element'>
                <source src={song}></source>
              </audio>
            )
          })}
        </div>
        <br/>
      </div>
    )
  }
}

export default App;
