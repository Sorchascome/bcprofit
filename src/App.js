import React, { Component } from 'react'
import ReactQueryParams from 'react-query-params'

import * as LeadHandler from './helpers/leadHandler'

import TopSection from './components/TopSection/TopSection'
import MidSection from './components/MidSection/MidSection'
import BottomSection from './components/BottomSection/BottomSection'

export default class App extends ReactQueryParams {
  constructor(props) {
    super(props)

    if (window.location.host.indexOf("localhost") > -1) {
      this.setQueryParams({
          validation: 3
      });
  }
  
    this.state = {
       step: 1,
       version: '',
       leadData: {
        account_id: 84,
        click_id: window.sbidTracking ? window.sbidTracking.getSession() : "",
        phone_country_prefix: "",
        fname: "",
        lname: "",
        email: "",
        phone_number: "",
        campaign: 1,
        dp1: this.queryParams.dp1 ? this.queryParams.dp1 : "",
        dp2: this.queryParams.dp2 ? this.queryParams.dp2 : "",
        dp3: this.queryParams.dp3 ? this.queryParams.dp3 : "",
        dp4: this.queryParams.dp4 ? this.queryParams.dp4 : "",
        dp5: this.queryParams.dp5 ? this.queryParams.dp5 : "",
        password: "",
        publisher_click_id: this.queryParams.pub_cid ? this.queryParams.pub_cid : "",
        page_url: window.location.toString(),
        ref_url: "",
        language: navigator.language.split('-')[0],
        funnel_name: "bitcoinprofit",
        validation: this.queryParams.validation ? parseInt(this.queryParams.validation.toString()) : 0
    }
    }

    this.handleStep = this.handleStep.bind(this);
    this.handleForward = this.handleForward.bind(this);
  }

  readTextFile = (file, callback) => {
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = () => {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                let allText = rawFile.responseText;

                const countriesJSON = LeadHandler.csvJSON(allText);
                this.setState({
                    countriesData: countriesJSON
                }, () => {
                    callback();

                });
            }
        }
    };
    rawFile.send(null);
  };

  sBidTrackingLoaded = () => {
      this.setState({
          leadData: {...this.state.leadData, click_id: window.sbidTracking ? window.sbidTracking.getSession() : ""}
      }, () => {
      });
  };

  componentDidMount() {
    this.sBidTrackingLoaded();

    if (document.getElementById("sb_trk")) {
        document.getElementById("sb_trk").addEventListener("tracking_loaded", this.sBidTrackingLoaded);
    }

    const file = require("./helpers/countries.csv");

    // this.readTextFile(file, () => {
    //     if(this.queryParams.lan){
    //         let country = this.state.countriesData.filter(c => {
    //             return c["Main Language"] === this.queryParams.lan
    //         })[0];

    //         if(country){
    //             let lang = country["Main Language"];
    //             let countryCode = country["ISO 3166-1 2 Letter Code"];
    //             let phonePrefix = country["ITU-T Telephone Code"];
    //             this.updateStateByLanguage(lang, countryCode, phonePrefix)
    //         }
    //         else{

    //         }
    //     }
    //     else{
    //         LeadHandler.postData('/language').then(res => {
    //             this.updateStateByLanguage(res.lang, res.countryCode);
    //             return res.countryCode;
    //         }).then(this.handleCountryCodeChange);
    //     }
    // });

  }

  handleStep(step) {
    if (step<4) {
      this.setState({step})
    }
  }

  handleForward = (fname, lname, email) => {
    this.setState({
        leadData: {
            ...this.state.leadData,
            email: email,
            fname: fname,
            lname: lname
        }
      }, () => {
          LeadHandler.sendLead('/lead_first_step', this.state.leadData).then(res => {
              if (window.sbidTracking) {
                  window.sbidTracking.track({e: 'lead_next1'});
              }
          });
      });
  };

  handleSubmit = (fname, lname, email, phoneNumber, password, phone_country_prefix) => {
      let beforeVersion = this.state.version;
      this.setState({
          leadData: {
              ...this.state.leadData,
              email: email,
              fname: fname,
              lname: lname,
              phone_number: phoneNumber,
              password: password
          },
          version: undefined
      }, () => {

          LeadHandler.sendLead('/leads', this.state.leadData).then(res => {
              if (window.sbidTracking) {
                  window.sbidTracking.track({e: 'lead_submit'});
              }

              if(res.success !== undefined) {
                  if(res.success === false) {

                      alert("Due to recent regulatory restriction in your country " +
                          "we are unable to connect you " +
                          "to a suitable brokerage firm. We will contact once the situation will be changed.");
                      this.setState({version: beforeVersion}, () =>{
                      });


                      // alert(response.redirectUrl);

                  }
                  else {
                      window.location.replace(res.redirectUrl);
                  }
              }
              else {
                  alert("Due to recent regulatory restriction in your country " +
                      "we are unable to connect you " +
                      "to a suitable brokerage firm. We will contact once the situation will be changed.");
                  this.setState({version: beforeVersion}, () =>{

                  });
              }


          });
      });
  };

  render() {
    return (
      <div className='App'>
        <TopSection handleStep={this.handleStep} step={this.state.step} handleSubmit={this.handleSubmit} handleForward={this.handleForward}/>
        <MidSection />
        <BottomSection handleStep={this.handleStep} step={this.state.step} handleSubmit={this.handleSubmit} handleForward={this.handleForward}/>
      </div>
    )
  }
}
