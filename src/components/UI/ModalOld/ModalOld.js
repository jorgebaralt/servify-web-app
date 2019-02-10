import React, { Component } from 'react';
// Worker functions
import { isMobile } from '../../../shared/isMobile';
// CSS
import classes from './Modal.module.css';
// JSX
import SVG from '../../SVG/SVG';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.myModal = React.createRef();
        this.escFunction = this.escFunction.bind(this);
        document.body.style.overflow = null;
    }

    state = {
        pageYOffset: null
    }

    onBackdropClickHandler = () => {
        this.props.closeModal();
    }

    escFunction = (e) => {
        if(e.keyCode === 27) {
            //Do whatever when esc is pressed
            this.props.closeModal();
        }
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

    shouldComponentUpdate(nextProps) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentDidUpdate (prevProps) {
        // To prevent scrolling when the modal is open
        if (this.props.show) {
            document.addEventListener("keydown", this.escFunction, false);
            document.body.style.overflow = 'hidden';
            // Disabling mobile scrolling
            if (isMobile()) {
                this.onHandleMobileScroll('disable');
            }
        // Only remove oferflow null when dismounting modal
        } else if ((prevProps.show !== this.props.show) && !this.props.show) {
            document.removeEventListener("keydown", this.escFunction, false);
            document.body.style.overflow = null;
            // Enabling mobile scrolling
            if (isMobile()) {
                this.onHandleMobileScroll('enable');
            }
        }
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.escFunction, false);
        document.body.style.overflow = null;
    }

    render() {
        const noCancel = this.props.alwaysShow;
        return (
            <div className={this.props.show ? classes.BodyOverlay : classes.Null}> 
                <div onClick={this.onBackdropClickHandler} className={this.props.show ? classes.ModalWrapper : null}>
                    <div className={this.props.show ? classes.ModalContainer : null} >
                        <div 
                            // Stopping propagation to stop the ModalWrapper closeModal execution from triggering upon
                            // interacting with the modal's children elements.
                            onClick={(e) => {e.stopPropagation()}} 
                            ref={this.myModal}
                            style={{
                                visibility: this.props.show ? 'visible' : 'hidden',
                                transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                                opacity: this.props.show ? '1' : '0',
                                maxWidth: this.props.maxWidth ? [this.props.maxWidth,'px'].join('') : null,
                                // Transparent or background styling
                                border: this.props.transparent ? 0 : null,
                                background: this.props.transparent ? 'none' 
                                    // Background styling, if passed as props.
                                    : this.props.background ? 
                                        this.props.background 
                                        : null
                            }}
                            className={this.props.className ? this.props.className : classes.Modal}>
                            {noCancel ? 
                                null
                                : (
                                    <div className={classes.CloseButtonWrapper}>
                                        <button 
                                            type="button"
                                            onClick={this.props.toggleModal}
                                            className={classes.CancelButton} 
                                            aria-busy="false" >
                                            <SVG fill={this.props.transparent ? '#FFF' : null} svg='cancel'/>
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

export default Modal;
