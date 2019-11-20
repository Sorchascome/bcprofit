import React from 'react'
import ReactQueryParams from 'react-query-params'
import {Route, BrowserRouter, Switch } from 'react-router-dom'

import TopSection from './components/TopSection/TopSection'
import MidSection from './components/MidSection/MidSection'
import BottomSection from './components/BottomSection/BottomSection'
import Page from './pages/Page'

// Pages
import pages from './pages'

export default class App extends ReactQueryParams {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                first_name: '',
                last_name: '',
                email: '',
                agree_2: false
            },
            errors: {},
            step: 1
        }

    }

    render() {

        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path = '/'>
                        <div className='App'>

                            <TopSection {...this.props} 
                                handleStep={(step) => this.setState({step})}
                                syncForms={(form) => this.setState({form})} 
                                syncErrors={(errors) => this.setState({errors})} 
                                syncState={this.state}/>

                            <MidSection languageManager={this.props.languageManager}/>

                            <BottomSection {...this.props}
                                handleStep={(step) => this.setState({step})}
                                syncForms={(form) => this.setState({form})} 
                                syncErrors={(errors) => this.setState({errors})} 
                                syncState={this.state}/>

                        </div>
                    </Route>
                    {Object.keys(pages).map(page => 
                        <Route path={'/' + page} key={page}> <Page page={pages[page]}/> </Route>
                    )}
                </Switch>
            </BrowserRouter>
        )
    }
}
