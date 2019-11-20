import React, { Component } from 'react'

import Header from './Header/Header'
import VideoPlayer from './VideoPlayer/VideoPlayer.js'
import Regform  from './Regform/Regform'

import video from './btcvid.mp4'
import badges from './badges.png'

export default class TopSection extends Component {
    constructor(props) {
        super(props)

        this.state = {showmodal: false}
    }
    
    handleScroll() {
        let panel = this.regPanel;

        window.scrollTo({
            top: panel.offsetTop,
            left: 0,
            behavior: 'smooth'
        })

    }

    handleClose() {
        this.setState({showmodal: false})
    }

    componentDidMount() {
        setTimeout(() => this.setState({showmodal: true}), 2500)
    }

    render() {
        let version = this.props.languageManager();

        return (
            <div className='TopSection'>
                <Header version={version} handleScroll={this.handleScroll.bind(this)}/>
                <div className="top-reg">
                    <VideoPlayer link={video} version={version} step={this.props.syncState.step}/>
                    <div className="regform" ref={ref => this.regPanel = ref}>
                        <div className="reg-title"><span>{version.topreg1}</span><br/>{version.topreg2}<br/>{version.topreg3}</div>
                        <Regform {...this.props}/>
                    </div>
                </div>
                <img src={badges} alt="badges" className="badges"/>
                <div className="modalscreen" style={{display: (this.state.showmodal) ? 'flex' : 'none'}}>
                    <div className="modal">
                        <div className="close" onClick={this.handleClose.bind(this)}>×</div>
                        <div className="title">{version.modal_title}</div>
                        <div className="subtitle">{version.modal_sub}</div>
                        <p>{version.modal_text1}</p>
                        <p>{version.modal_text2}</p>
                        <Regform {...this.props} class={'inmodal'}/>
                    </div>
                </div>
            </div>
        )
    }
}
