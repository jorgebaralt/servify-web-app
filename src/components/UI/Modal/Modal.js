import React, { Component } from 'react';
// CSS
import classes from './Modal.module.css'
// JSX
import Backdrop from '../Backdrop/Backdrop.js'
import SVG from '../../SVG/SVG';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentDidUpdate () {
        // To prevent scrolling when the modal is open
        if (this.props.show) {
            document.body.style.overflow = 'hidden';
        } else {
                document.body.style.overflow = null;
        }
    }

    render() {
        return (
            <>  
                <Backdrop 
                    show={this.props.show} 
                    clicked={this.props.toggleModal} />
                <div 
                    style={{
                        visibility: this.props.show ? 'visible' : 'hidden',
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0',
                    }}
                    className={classes.Modal}>
                    <div className={classes.CloseButtonWrapper}>
                        <button 
                            type="button"
                            onClick={this.props.toggleModal}
                            className={classes.CancelButton} 
                            aria-busy="false" >
                            <SVG svg='cancel'/>
                        </button>
                    </div>
                    <section>
                        {this.props.children}
                    </section>
                </div>
            </>
        );
    }
};

export default React.memo(Modal);