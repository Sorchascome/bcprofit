import React, { Component } from 'react'
import ReactPlayer from 'react-player'

import btn from './play_btn.png'
 
export default class VideoPlayer extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       play: false
    }
  }

  handlePlay(e) {
    e.target.parentElement.parentElement.style.display = 'none';
    this.setState({play: true});
  }

  render () {
    return (
      <div className="VideoPlayer">
        <div className="info">
          <div className="inner">
            <div className="text">Klik for at se og lær hemmeligheden!</div>
            <img src={btn} alt="play" onClick={this.handlePlay.bind(this)}/>
          </div>
        </div>
        <ReactPlayer url={this.props.link} playing={this.state.play} controls={true} width='99.8%' height='100%'/>
      </div>
    )
  }
}