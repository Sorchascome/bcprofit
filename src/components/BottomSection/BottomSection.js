import React, { Component } from 'react'

import Regform from '../TopSection/Regform/Regform'

import logo from './bcprofitmin.svg'

export default class BottomSection extends Component {
    render() {
        return (
            <div className='BottomSection'>
                <div className="bottomreg">
                    <div className="content">
                        <div className="title">Registrer dig nedenfor</div>
                        <div className="subtitle">så fører vi dig gennem processen.</div>
                        <div className="regform">
                            <Regform handleForward={this.props.handleForward} handleStep={this.props.handleStep} handleSubmit={this.props.handleSubmit} step={this.props.step}/>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <div className="content">
                        <img src={logo} alt="logo" className="footerlogo"/>
                        <div className="copyright">Copyright 2019 The Bitcoin Profit</div>
                        <div className="links">
                            <a href="">Government Disclaimer</a>  
                            <a href="">Privacy</a>
                            <a href="">Policy</a>
                            <a href="">Terms</a>
                            <a href="">Earnings Disclaimer</a>
                            <a href="">Spam Policy</a>
                        </div>
                        <div className="risk">
                            <p>
                                <b>VIGTIGT</b>: Indtjenings- og Juridiske Ansvarsfraskrivelser
                            </p>
                            <p>
                                Indtjenings- og indkomstsrepræsentationer lavet af , (kollektivt "Denne Hjemmeside" bliver kun brugt som tilstræbelsesværdige eksempler for dit indtjeningspotentiale. Deres succes beskrevet i anbefalinger og andre eksempler er usædvanlige resultater, og er dermed ikke ment som en garanti for at du og andre vil opnå de samme resultater. Individuelle resultater vil variere og er fuldstændigt baseret på din brug af .
                            </p>

                            <p>
                                Denne Hjemmeside er ikke ansvarlig for dine handlinger. Du har alt ansvar for dine handlinger og beslutninger når du bruger produkter og ydelser, og derfor skal du altid handle med forsigtighed og rettidig omhu. Du erklærer dig enig i, at Denne Hjemmeside ikke er forpligtet over for dig på nogen måde for resultaterne af din brug af vores produkter og ydelser. Læs vores vilkår og betingelser for at se hele vores ansvarsfraskrivelse af forpligtelser og andre restriktioner.
                            </p>

                            <p>
                                Denne Hjemmeside kan modtage kompensation for produkter og ydelser, de anbefaler til dig. Hvis du ikke vil have, at Denne Hjemmeside bliver kompenseret for en anbefaling, så anbefaler vi, at du søger online efter lignende produkter gennem et link, der ikke er et partner-link.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
