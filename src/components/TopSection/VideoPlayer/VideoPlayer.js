import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ReactPlayer from 'react-player'

import btn from './play_btn.png'
 
export default class VideoPlayer extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      play: false,
      height: 0
    }

    this.updateHeight = this.updateHeight.bind(this)
  }

  handlePlay() {
    if (window.sbidTracking) {
        window.sbidTracking.settings.params.video_play = "1";
    }
    this.setState({play: true});
  }

  componentDidMount() {
    this.updateHeight()
    window.addEventListener('resize', this.updateHeight)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.step !== this.props.step) this.updateHeight()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateHeight)
  }

  updateHeight() {
    this.setState({height: ReactDOM.findDOMNode(this).offsetHeight})
  }

  render () {
    let version = this.props.version;

    return (
      <div className="VideoPlayer" ref={this.player}>
        <div className="info" style={{display: (this.state.play) ? 'none' : 'block', height: this.state.height}}>
          <div className="inner">
            <div className="text">{version.video}</div>
            <img src={btn} alt="play" onClick={this.handlePlay.bind(this)}/>
          </div>
        </div>
        <ReactPlayer url={this.props.link} playing={this.state.play} controls={true} width='99.8%' height='100%'/>
      </div>
    )
  }
}