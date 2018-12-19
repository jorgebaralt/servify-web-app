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
                <div className={classes.SidePanelWrapper}>
                    {/* Side Panel */}
                    <SidePanel
                        toggleCategoryFilter={this.toggleCategoryFilter} />
                </div>
                <div className={classes.ServicesWrapper}>
                    {/* Default and Filtered */}
                    <ServicesContainer />
                </div>
            </div>
        )
    }
}

export default Services;