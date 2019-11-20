import React, { Component } from 'react'

export default class MidSection extends Component {
    render() {
    let version = this.props.languageManager();

        return (
            <div className="MidSection">
                <div className="innersection">
                    <div className="content">
                        <div className="title">{version.qna_title}</div>
                        <div className="subtitle">{version.qna_subtitle}</div>
                        <div className="rows">
                            <div className="top">
                                {
                                    version.qna.slice(0,3).map((item, index) => {
                                        return (
                                            <div className="item" key={index}>
                                                <div className="column">
                                                    <div className="qindex">Q{index+1}</div>
                                                    <div className="aindex">A{index+1}</div>
                                                </div>
                                                <div className="column">
                                                    <div className="q"><span>{item.q}</span></div>
                                                    <div className="a">{item.a}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="bottom">
                            {
                                    version.qna.slice(3,6).map((item, index) => {
                                        return (
                                            <div className="item" key={index+3}>
                                                <div className="column">
                                                    <div className="qindex">Q{index+4}</div>
                                                    <div className="aindex">A{index+4}</div>
                                                </div>
                                                <div className="column">
                                                    <div className="q"><span>{item.q}</span></div>
                                                    <div className="a">{item.a}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="innersection">
                    <div className="content">
                        <div className="title">{version.mem_title}</div>
                        <div className="subtitle next">{version.mem_subtitle}</div>
                        <div className="rows">
                            <div className="top">
                                {
                                    version.mems.slice(0,2).map(item => {
                                        return (
                                            <div className="rich" key={item.name}>
                                                <div className="column">
                                                    <img src={item.img} alt={item.name}/>
                                                </div>
                                                <div className="column">
                                                    <div className="name">{item.name}</div>
                                                    <div className="text">{item.text}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="bottom">
                            {
                                    version.mems.slice(2,4).map(item => {
                                        return (
                                            <div className="rich" key={item.name}>
                                                <div className="column">
                                                    <img src={item.img} alt={item.name}/>
                                                </div>
                                                <div className="column">
                                                    <div className="name">{item.name}</div>
                                                    <div className="text">{item.text}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
