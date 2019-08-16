import React, { Component } from 'react'

import * as validateInput from '../../../helpers/validateInput'
import IntlTelInput from 'react-intl-tel-input'
import 'react-intl-tel-input/dist/main.css'

import * as errorMessage from '../../../helpers/errorMessage'

import { ReactComponent as Check } from './check.svg'
import { ReactComponent as Mark } from './excl.svg'
import lock from './lock.svg'

export default class Regform extends Component {
    constructor(props) {
        super(props)

        this.handleBackwards = this.handleBackwards.bind(this);
        this.handleSync = this.handleSync.bind(this);
    }

    handleForward(e) {
        let form = e.target.parentElement;
        let forward = [false, false, false, false];
        let values = [];
        
        // Step 1
        if (form.classList.contains('one')) {

            if(!form.querySelector('.accept').checked) {
                errorMessage.errorMessage(form.querySelector('.required'), 'Please accept this if you want to proceed');
            } else {
                forward[3] = true;
            }

            let inputs = [...form.querySelectorAll('.inputfield')];
            inputs.map((input, index) => {
                if(input.value.length === 0) {
                    errorMessage.errorMessage(input, 'Please fill this field');
                } else if ((index === 0 || index === 1) && !validateInput.checkOnlyLetters(input.value)) {
                    errorMessage.errorMessage(input, 'Use letters only');
                } else if ((index === 2) && !validateInput.validateEmail(input.value)) {
                    errorMessage.errorMessage(input, 'Invalid email format');
                } else {
                    forward[index] = true;
                    values.push(input);
                }
            })

            if (forward[0] && forward[1] && forward[2] && forward[3]) {
                this.props.handleForward(values[0], values[1], values[2]);
                this.props.handleStep(this.props.step + 1);
            }
        }

        // Step 2
        if (form.classList.contains('two')) {

            let reqs = [...form.querySelectorAll('li')];

            if(reqs.every(req => req.classList.contains('ok'))){
                values.push(form.querySelector('.pass').value);
                this.props.handleStep(this.props.step + 1);
            }
        }


        // Step 3
        if (form.classList.contains('three')) {

            let tel = form.querySelector('.tel');
            let intel = form.querySelector('.intl-tel-input');

            if(tel.value.length === 0) {
                errorMessage.errorMessage(intel, 'Please fill this field');
            } else if(!validateInput.checkOnlyNumbers(tel.value)) {
                errorMessage.errorMessage(intel, 'Use numbers only');
            } else {
                this.props.handleSubmit(values[0], values[1], values[2], values[3], tel.value);
            }
        }
    }

    handleBackwards(e) {
        let back = parseInt(e.target.getAttribute('index'));
        let forms = [...document.querySelectorAll('.Regform')];

        forms.map(form => {
            let steps = [...form.querySelectorAll('.form-wrapper')];
            steps.map((step, index) => {
                for (let i=0;i<=back;i++) {
                    step.classList.remove('step');
                }
            })
        })

        this.props.handleStep(parseInt(e.target.getAttribute('index')));
    }

    handleSync(e) {
        let input = e.target.value;
        let inputClass = e.target.className;
        let forms = [...document.querySelectorAll('.Regform')];

        forms.map(form => {
            form.getElementsByClassName(inputClass)[0].value = input;
        })
    }

    componentDidUpdate() {
        let forms = [...document.querySelectorAll('.Regform')];

        forms.map(form => {
            let steps = [...form.querySelectorAll('.form-wrapper')];
            steps.map((step, index) => {
                if (index+1 === this.props.step-1) {
                    step.classList.add('step');
                }
            })
        })
    }

    componentDidMount() {
        let inputs = [...document.querySelectorAll('.inputfield')];

        inputs.map(input => {
            input.addEventListener('change', this.handleSync);
        })
    }

    render() {
        return (
            <div className={"Regform " + (this.props.class ? this.props.class : '')}>
                <div className="steps">
                    {[1,2,3].map(index => {
                        if(index <= this.props.step-1) {
                            return (
                                <div className="num check" key={index} index={index} onClick={this.handleBackwards}><Check className="checksvg"/></div>
                            )
                        } else {
                            return (
                                <div className="num" key={index}>{index}</div>
                            )
                        }
                    })}
                </div>
                <div className='inner'>
                    <div className='form-wrapper one'>
                        <input className="inputfield fname" type="text" name="fname" placeholder="Fornavn"/>
                        <input className="inputfield lname" type="text" name="lname" placeholder="Efternavn"/>
                        <input className="inputfield email" type="text" name="email" placeholder="Email" autoComplete='off'/>
                        <div className='agreement'>
                            <input type="checkbox" name="agree_one" />
                            <span>Jeg giver mit samtykke til at min e-mailadresse lagres med det formål, at jeg kan modtage information og kommercielle tilbud om tradingsoftware og -platforme.</span>
                        </div>
                        <div className='agreement required'>
                            <input type="checkbox" className='accept' name="agree_two" />
                            <span>Jeg erklærer mig enig i disse <a href="">Vilkår og Betingelser</a> og denne <a href="">Privatlivspolitik</a></span>
                        </div>
                        <button onClick={this.handleForward.bind(this)} className='start'>Næste</button>
                        <div className="bottominfo"><img src={lock} alt="lock"/> Du kan skifte mening til enhver tid ved at klikke på afmeldelseslinket i...</div>
                    </div>
                    <div className='form-wrapper two'>
                        <input className="inputfield pass" type="password" maxLength="12" onChange={validateInput.checkInput} name="password" placeholder="Kodeord"/>
                        <ul className='req'>
                            <li>Kodeordet skal være på 8-12 tegn.</li>
                            <li>Må ikke indeholde specielle tegn.</li>
                            <li>Skal indeholde mindst 1 bogstav.</li>
                            <li>Skal indeholde mindst 1 stort bogstav.</li>
                            <li>Skal indeholde mindst 1 tal.</li>
                        </ul>
                        <button onClick={this.handleForward.bind(this)} className='start'>Næste</button>
                    </div>
                    <div className='form-wrapper three'>
                        <IntlTelInput
                            containerClassName="intl-tel-input"
                            inputClassName="inputfield tel"
                            autoPlaceholder={true}
                            separateDialCode={true}
                            />
                        <button onClick={this.handleForward.bind(this)} className='start' >Kom i gang nu</button>
                    </div>
                </div>
                <div className="error"><Mark className='excl'/><span></span></div>
            </div>
        )
    }
}
