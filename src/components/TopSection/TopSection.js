import React, { Component } from 'react'

import Header from './Header/Header'
import VideoPlayer from './VideoPlayer/VideoPlayer.js'
import Regform  from './Regform/Regform'

import video from './btcvid.mp4'
import badges from './badges.png'

export default class TopSection extends Component {
    handleClose(e) {
        e.target.parentElement.parentElement.style.display = 'none';
    }

    componentDidMount() {


        setTimeout(() => {
            document.querySelector('.modalscreen').style.display = 'flex';
        }, 
        2000);
    }

    render() {
        return (
            <div className='TopSection'>
                <Header />
                <div className="top-reg">
                    <VideoPlayer link={video} />
                    <div className="regform">
                        <div className="reg-title"><span>REGISTRER DIG NEDENFOR</span><br/>så fører vi dig gennem processen.</div>
                        <Regform handleStep={this.props.handleStep} handleForward={this.props.handleForward} handleSubmit={this.props.handleSubmit} step={this.props.step}/>
                    </div>
                </div>
                <img src={badges} alt="badges" className="badges"/>
                <div className="modalscreen">
                    <div className="modal">
                        <div className="close" onClick={this.handleClose}>×</div>
                        <div className="title">Vent!</div>
                        <div className="subtitle">Før du går…</div>
                        <p>Markederne bevæger sig hurtigt. Gå ikke glip af din chance for at drage fordel af de seneste stigninger og fald.</p>
                        <p>Tilmeld dig i dag og slut dig til de tusindvis af mennesker, der ændrer deres liv takket være online handel.</p>
                        <Regform handleStep={this.props.handleStep} handleForward={this.props.handleForward} handleSubmit={this.props.handleSubmit} class={'inmodal'} step={this.props.step}/>
                    </div>
                </div>
            </div>
        )
    }
}
