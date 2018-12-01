import React, { Component } from 'react';

import classes from './Modal.module.css'

import Backdrop from '../Backdrop/Backdrop.js'

class Modal extends Component {

    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    // }

    render() {
        return (
            <>  
                <Backdrop 
                    show={this.props.show} 
                    clicked={this.props.purchasing} />
                <div 
                    style={ {
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0',
                    } }
                    className={classes.Modal}>
                    {this.props.children}
                </div>
            </>
        );
    }
};

export default React.memo(Modal);