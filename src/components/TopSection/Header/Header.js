import React, { Component } from 'react'

import logo from './bcprofit.svg'

export default class Header extends Component {
    render() {
        return (
            <div className='Header'>
                <div className="disclaimer">- Tekstreklame -</div>
                <div className="content">
                    <img src={logo} alt="logo"/>
                    <div className="title">Tjen millioner på bitcoin selv når crypto markedet bryder sammen</div>
                    <div className="subtitle">
                        <span>Meld dig til i dag</span> og se, hvor meget du kan tjene
                    </div>
                 </div>   
            </div>
        )
    }
}
