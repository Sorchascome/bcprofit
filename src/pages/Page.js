import React, { Component } from 'react'

export default class Page extends Component {

    componentDidMount() {
        window.scrollTo(0,0)
    }

    render() {
        let page = this.props.page;

        return (
            <div className='Page'>
                <div className="title">{page.title}</div>
                {page.toptext.map((text, index) => {
                    return (<p key={index}>{text}</p>)
                })}
                    {page.sections.map((section, index) => {
                    return (
                        <div key={index}>
                            <div className="section_title">{section.title}</div>
                            {section.text.map((text, index) => {
                            return (<p className={(text.length < 50) ? 'bold' : ''} key={index}>{text}</p>)
                            })}
                        </div>
                    )
                })}
                <div className="copyright">Copyright © 2019 | All Rights Reserved</div>
            </div>
        )
    }
}
