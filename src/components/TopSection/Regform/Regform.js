import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import IntlTelInput from 'react-intl-tel-input'
import 'react-intl-tel-input/dist/main.css'

import { ReactComponent as Check } from './check.svg'
import { ReactComponent as Mark } from './excl.svg'
import lock from './lock.svg'
import logo from '../../BottomSection/bcprofitmin.svg'


export default class Regform extends Component {
    constructor(props) {
        super(props)

        this.inputs = ['first_name', 'last_name', 'email']

        this.tooltips = {};
        this.passtest =  {};

        ['invalidlength', 'nospecial', 'nolowercase', 'nouppercase', 'nonumber'].map((err, index) => this.passtest[err] = this.props.languageManager().passtest[index])

    }


    updateValue(value, key, callback) {
        let obj = {},
        tempForm = this.props.syncState.form
        obj[key] = value
        Object.assign(tempForm, obj)

        new Promise((resolve, reject) => resolve(this.props.syncForms(tempForm))).then(callback)
    }

    handleForward() {
        let validate = this.props.validateParams(this.props.syncState.form)
        
        if (validate.success) this.props.setLeadData(this.props.syncState.form)
            .then(this.props.handleStep(this.props.syncState.step + 1))
            .then(() => { if (this.props.syncState.step === 2) this.props.handleLeadStep() })
            .then(() => this.props.syncErrors({password: {empty: true}}))
        else this.props.syncErrors(validate.errors)
    }

    handleSubmit() {
        this.props.handleStep(this.props.syncState.step + 1)

        this.props.setLeadData(this.props.syncState.form)
            .then(this.props.handleSubmit)
            .then(res => {console.log(res); if (res.redirectUrl) {window.location = res.redirectUrl} else {this.props.syncErrors({responseError: res.error}); this.props.handleStep(5)}})
    }

    toggleTooltip(input) {
        if (this.tooltips[input]) this.tooltips[input].style.opacity = 0
    }

    checkPass(pass) {
        let valid = this.props.validateInput({password: pass})
        this.props.syncErrors(valid)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.syncState.errors !== this.props.syncState.errors)
        Object.keys(this.tooltips).map(input => { if (this.tooltips[input]) this.tooltips[input].style.opacity = 1 })
    }

    render() {
        let version = this.props.languageManager()

        if (this.props.syncState.step <= 3) {
            return (
                <div className={"Regform " + (this.props.class ? this.props.class : '')} ref={this.setTextInputRef}>
                    <div className="steps">
                        {[1,2,3].map(index => {
                            if(index <= this.props.syncState.step-1) {
                                return (
                                    <div className="num check" key={index} index={index} onClick={() => this.props.handleStep(index)}><Check className="checksvg"/></div>
                                )
                            } else {
                                return (
                                    <div className="num" key={index}>{index}</div>
                                )
                            }
                        })}
                    </div>
                    <div className='inner'>
                        <div className={'form-wrapper one' + ((this.props.syncState.step > 1) ? ' step' : '')}>
                            
                            {this.inputs.map(input => 
                                <div key={input}>
                                    <input 
                                        className={'inputfield ' + input}
                                        onChange={e => this.updateValue(e.target.value, input)}
                                        onFocus={() => this.toggleTooltip(input)}
                                        type="text" name={input} 
                                        placeholder={version[input]} 
                                        value={this.props.syncState.form[input]}/>

                                    {((this.props.syncState.errors[input] && this.props.syncState.errors[input].messages)) ? 
                                    <div 
                                        ref={ref => this.tooltips[input] = ref} 
                                        style={{opacity: (this.props.syncState.errors[input]) ? 1 : 0}} 
                                        className="error">
                                            <Mark className='excl'/>
                                            <span>{this.props.syncState.errors[input].messages[0]}</span>
                                    </div> : ''}
                                </div>)}

                            <div className='agreement'>
                                <input type="checkbox" name="agree_one" />
                                <span>{version.req1[0]} </span>
                            </div>
                            <div className='agreement required'>
                                <input type="checkbox" className='accept' checked={this.props.syncState.form.agree_2} name="agree_2" onChange={e => {this.toggleTooltip(e.target.name); this.updateValue(e.target.checked, e.target.name)}} />
                                <span>{version.req2[0]} <Link to='/terms'>{version.req2[1]}</Link>{version.req2[2]}<Link to='/privacy'>{version.req2[3]}</Link>{version.req2[4]}</span>
                                {((this.props.syncState.errors['agree_2'] && this.props.syncState.errors['agree_2'].messages)) ? 
                                    <div 
                                    ref={ref => this.tooltips['agree_2'] = ref} 
                                    style={{opacity: (this.props.syncState.errors['agree_2']) ? 1 : 0}} 
                                    className="error agree">
                                        <Mark className='excl'/>
                                        <span>{(this.props.syncState.errors['agree_2'] && this.props.syncState.errors['agree_2'].messages) ? this.props.syncState.errors['agree_2'].messages[0] : ''}</span>
                                </div> : ''}
                            </div>
                            <button className='start' onClick={this.handleForward.bind(this)}>{version.button}</button>
                            <div className="bottominfo"><img src={lock} alt="lock"/>{version.bottominfo}<div className="more" onMouseOver={() => this.infoBox.style.opacity = "1"} onMouseOut={() => this.infoBox.style.opacity = "0"} >{version.more}</div><div className="morebox" ref={ref => this.infoBox = ref}>{version.morebox}</div></div>
                        </div>
                        <div className={'form-wrapper two' + ((this.props.syncState.step > 2) ? ' step' : '')}>
                            <input className="inputfield password" type="password" maxLength="8" onChange={e => this.updateValue(e.target.value, e.target.name, this.checkPass(e.target.value))} name="password" placeholder={version.password}/>
                            <ul className='req'>
                                {Object.keys(this.passtest).map(key => {
                                    return (<li className={(this.props.syncState.errors.password && (this.props.syncState.errors.password[key] || this.props.syncState.errors.password.empty)) ? '' : 'f'} key={key}>{this.passtest[key]}</li>)
                                })}
                            </ul>
                            <button className='start' onClick={this.handleForward.bind(this)}>{version.button}</button>
                        </div>
                        <div className='form-wrapper three'>
                            <IntlTelInput
                                preferredCountries={[this.props.countryCode]}
                                containerClassName="intl-tel-input"
                                inputClassName="inputfield tel"
                                autoPlaceholder={true}
                                separateDialCode={true}
                                value={this.props.syncState.form.phone_number}
                                onPhoneNumberChange={(a, value, b) => {value = value.replace(/\D/g,''); this.updateValue(value, 'phone_number')}}
                                />
                            <button className='start' onClick={this.handleSubmit.bind(this)}>{version.button_last}</button>
                        </div>
                    </div>

                </div>
            )
        } else {
            return (
                <div className={"Regform " + (this.props.class ? this.props.class : '')} ref={this.setTextInputRef}>
                    <div className="inner">
                        {(this.props.syncState.step === 4) ? <img src={logo} alt="lodaing" className="loading"/> : 
                        
                            <div className={'form-wrapper'}>
                    
                            <span className="response_error">{this.props.syncState.errors.responseError}</span>
                            <button className='start' onClick={() => this.props.handleStep(1)}>OK</button>
                        
                        </div>

                        }
                    </div>
                </div>
            )
        }
    }
}


