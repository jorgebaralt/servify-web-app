import React, { Component } from 'react'
// CSS
import classes from './Services.module.css'
// JSX
import ServicesContainer from './ServicesContainer/ServicesContainer';
import SidePanel from './SidePanel/SidePanel';

class Services extends Component {
    render () {
        return (
            <div className={classes.Wrapper}>
                <SidePanel />
                {/* Default and Filtered Services */}
                <ServicesContainer />
            </div>
        )
    }
}

export default Services;