import React, { Component } from 'react'

import qna from './qna.js'
import rich from './rich.js'

export default class MidSection extends Component {
    render() {
        return (
            <div className="MidSection">
                <div className="innersection">
                    <div className="content">
                        <div className="title">Ofte stillede spørgsmål</div>
                        <div className="subtitle">Her er mest almindelige spørgsmål med vores svar.</div>
                        <div className="rows">
                            <div className="top">
                                {
                                    qna.slice(0,3).map((item, index)=> {
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
                                    qna.slice(3,6).map((item, index)=> {
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
                        <div className="title">Berømte navne indenfor trading</div>
                        <div className="subtitle next">Der er mange store navne indenfor trading. Her er hvad nogle af de mest berømte tradere havde at sige.</div>
                        <div className="rows">
                            <div className="top">
                                {
                                    rich.slice(0,2).map(item => {
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
                                    rich.slice(2,4).map(item => {
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
