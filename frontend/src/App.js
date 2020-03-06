import React from 'react'
import './App.css'
import cover from './assets/nuncaestuveaqui.jpg'
import track1 from './assets/postal.mp3'
import track2 from './assets/x.mp3'
import track3 from './assets/inmersa.mp3'
import track4 from './assets/tematriste.mp3'
import track5 from './assets/elpresagio.mp3'
import track6 from './assets/algo.mp3'
import track7 from './assets/shanzhai.mp3'
import play from './assets/play.png'
import pause from './assets/pause.png'
import stop from './assets/stop.png'
import prev from './assets/prev.png'
import next from './assets/next.png'

class App extends React.Component {
  state = {
    songArray: [track1, track2, track3, track4, track5, track6, track7],
    currAudioIndex: 0,
    nextAudioIndex: 1,
    currTime: '0:00',
    songTitles: ['postal', 'x', 'inmersa', 'tema triste', 'el presagio', 'algo', 'shanzhai']
  }

  playAudio = () => {
    const { currAudioIndex, nextAudioIndex } = this.state
    const audioElements = document.getElementsByClassName('audio-element')
    const currentAudio = audioElements[currAudioIndex]
//    currentAudio.controls = true
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
//    currentAudio.controls = false
    this.setState({
      currTime:'0:00'
    })
  }

  prevAudio = async () => {
    const { currAudioIndex, nextAudioIndex } = this.state
    const currentAudio = document.getElementsByClassName('audio-element')[currAudioIndex]
    if (currAudioIndex > 0 && currentAudio.paused) {
      await this.stopAudio()
//      currentAudio.controls = false
      this.setState({
        currAudioIndex: currAudioIndex - 1,
        nextAudioIndex: nextAudioIndex - 1
      })
    } else if (currAudioIndex > 0) {
      await this.stopAudio()
//      currentAudio.controls = false
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
//      currentAudio.controls = false
      this.setState({
        currAudioIndex: currAudioIndex + 1,
        nextAudioIndex: nextAudioIndex + 1
      })
    } else if (currAudioIndex < (audioElements.length - 1)) {
      await this.stopAudio()
//      currentAudio.controls = false
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
    const { songArray, songTitles, currAudioIndex, currTime } = this.state
    return (
      <div className="App">
        <div className='cover'>
          <img src={cover} className='pic' alt='pic'/>
        </div>
        <br/>
        <div className='controls'>
          <img src={play} onClick={this.playAudio} className='control' alt='play'></img>
          <img src={pause} onClick={this.pauseAudio} className='control' alt='pause'></img>
          <img src={stop} onClick={this.stopAudio} className='control' alt='stop'></img>
          <img src={prev} onClick={this.prevAudio} className='control' alt='prev'></img>
          <img src={next} onClick={this.nextAudio} className='control' alt='next'></img>
        </div>
        <div className='display'>
          <h1 className='songTitle'>nunca estuve aquí</h1>
          <h2 className='songName'>{songTitles[currAudioIndex]}</h2>
          <h3 className='songTime'>{currTime}</h3>
        </div>
        <div className='audios'>
          {songArray.map((song) => {
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
