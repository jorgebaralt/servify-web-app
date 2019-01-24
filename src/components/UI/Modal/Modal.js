import React, { Component } from 'react';
// CSS
import classes from './Modal.module.css'
// JSX
import Backdrop from '../Backdrop/Backdrop.js'
import SVG from '../../SVG/SVG';

class Modal extends Component {

    constructor(props) {
        super(props);
        this.myModal = React.createRef();
        this.escFunction = this.escFunction.bind(this);
        // If on mobile drawer then don't do anything
        if (document.body.clientWidth < 1121) {
            return;
        }
        document.body.style.overflow = null;
    }

    escFunction(e){
        if(e.keyCode === 27) {
            //Do whatever when esc is pressed
            this.props.closeModal();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentDidUpdate () {
        // If on mobile drawer then don't do anything
        if (document.body.clientWidth < 1121) {
            return;
        }
        // To prevent scrolling when the modal is open
        if (this.props.show) {
            document.addEventListener("keydown", (e) => this.escFunction(e), false);
            document.body.style.overflow = 'hidden';
        } else {
            document.removeEventListener("keydown", () => this.escFunction(), false);
            document.body.style.overflow = null;
        }
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", () => this.escFunction(), false);
        document.body.style.overflow = null;
    }

    render() {
        const noCancel = this.props.alwaysShow;
        return (
            <div className={this.props.show ? classes.BodyOverlay : classes.Null}> 
                <div className={this.props.show ? classes.ModalWrapper : null}>
                    <div className={this.props.show ? classes.ModalContainer : null}>
                        <Backdrop 
                            show={this.props.show} 
                            clicked={this.props.toggleModal} />
                        <div ref={this.myModal}
                            style={{
                                visibility: this.props.show ? 'visible' : 'hidden',
                                transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                                opacity: this.props.show ? '1' : '0',
                            }}
                            className={classes.Modal}>
                            {noCancel ? 
                                null
                                : (
                                    <div className={classes.CloseButtonWrapper}>
                                        <button 
                                            type="button"
                                            onClick={this.props.toggleModal}
                                            className={classes.CancelButton} 
                                            aria-busy="false" >
                                            <SVG svg='cancel'/>
                                        </button>
                                    </div>
                                )}
                            <section>
                                {this.props.children}
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default React.memo(Modal);