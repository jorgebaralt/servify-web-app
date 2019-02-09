import React, { Component } from 'react';
// Worker functions
import { isMobile } from '../../../shared/isMobile';
// CSS
import classes from './MobileDrawer.module.css';
// JSX
import NagivationItems from '../NavigationItems/NavigationItems';

class MobileDrawer extends Component {
    constructor(props) {
        super(props);
        document.body.style.overflow = null;
    }

    state = {
        pageYOffset: null
    }

    onHandleMobileScroll = (handler) => {
        switch (handler) {
            case 'enable':
                // Enabling mobile scrolling
                document.body.style.position = null;
                document.body.style.top = null;
                document.body.style.width = null;
                window.scrollTo(0, this.state.pageYOffset);
            break;
            case 'disable':
                const pageYOffset = window.pageYOffset;
                document.body.style.top = `-${pageYOffset}px`;
                document.body.style.position = 'fixed';
                document.body.style.width = '100%';
                this.setState({
                    pageYOffset: pageYOffset
                }); 
            break;
            default:
            // do nothing
        }
        return;
    }
    
    componentDidUpdate () {
        if (this.props.isOpen) {
            document.body.style.overflow = 'hidden';
            // Disabling mobile scrolling
            if (isMobile()) {
                this.onHandleMobileScroll('disable');
            }
        } else {
            document.body.style.overflow = null;
            // Enabling mobile scrolling
            if (isMobile()) {
                this.onHandleMobileScroll('enable');
            }
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.isOpen !== this.props.isOpen || nextProps.children !== this.props.children;
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

export default MobileDrawer;