import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import Regform from '../TopSection/Regform/Regform'

import logo from './bcprofitmin.svg'

export default class BottomSection extends Component {
    render() {
        let version = this.props.languageManager();

        return (
            <div className='BottomSection'>
                <div className="bottomreg">
                    <div className="content">
                        <div className="title">{version.topreg1}</div>
                        <div className="subtitle">{version.topreg2}</div>
                        <div className="regform">
                            <Regform {...this.props} />
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <div className="content">
                        <img src={logo} alt="logo" className="footerlogo"/>
                        <div className="copyright">Copyright {(new Date).getFullYear()} The Bitcoin Profit</div>
                        <div className="links">
                            <Link to='/gov'>Government Disclaimer</Link>
                            <Link to='/privacy'>Privacy Policy</Link>
                            <Link to='/terms'>Terms</Link>
                            <Link to='/disc'>Earnings Disclaimer</Link>
                            <Link to='/spam'>Spam Policy</Link>
                        </div>
                        <div className="risk">
                            <p>
                                <b>{version.risk[0]}</b>: {version.risk[1]}
                            </p>
                            <p>
                                {version.risk[2]}
                            </p>

                            <p>
                                {version.risk[3]}
                            </p>

                            <p>
                                {version.risk[4]}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
