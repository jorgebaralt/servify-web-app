import React, { Component } from 'react';
// CSS
import classes from './MobileDrawer.module.css';
import NagivationItems from '../NavigationItems/NavigationItems';
// JSX
import { withRouter } from 'react-router-dom';

class MobileDrawer extends Component {
    constructor(props) {
        super(props);
        document.body.style.overflow = null;
    }
    
    componentDidUpdate () {
        if (this.props.isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = null;
        }
    }

    render () {
    let attachedClasses = [classes.Wrapper, classes.Close];
    if (this.props.isOpen) {
        attachedClasses = [classes.Wrapper, classes.Open];
    }
    
    return (
        <div className={attachedClasses.join(' ')}>
            <div className={classes.Container}>
                <nav className={classes.Anchor}>
                    <NagivationItems  
                        navbarType='MobileDrawer'
                        onClick={this.props.onClick}
                        isNavbarTransparent={this.props.navbarTransparent} 
                        toggleAuthModal={this.props.toggleAuthModal} />
                </nav>
            </div>
        </div>
    );
    }
}

export default withRouter(MobileDrawer);