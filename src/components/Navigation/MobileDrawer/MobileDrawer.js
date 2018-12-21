import React, { Component } from 'react';
// CSS
import classes from './MobileDrawer.module.css';

class MobileDrawer extends Component {

    componentDidMount () {
        document.body.style.overflow = 'hidden';
    }

    componentWillMount () {

    }

    render () {
    let attachedClasses = [classes.Wrapper, classes.Close];
    if (this.props.bIsDrawerOpen) {
        attachedClasses = [classes.Wrapper, classes.Open];
    }
    return (
        <>  
            {/* <Backdrop 
                show={props.bIsDrawerOpen} 
                clicked={props.click} /> */}
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Container}>
                    <nav className={classes.Anchor}>
                        {this.props.children}
                    </nav>
                </div>
            </div>
        </>
    );
    }
}

export default MobileDrawer;