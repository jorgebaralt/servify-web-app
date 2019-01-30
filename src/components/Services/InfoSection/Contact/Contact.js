import React, { Component } from 'react';
// CSS
import classes from './Contact.module.css';
// JSX
import SVG from '../../../SVG/SVG';
import Modal from '../../../UI/Modal/Modal';
import Separator from '../../../UI/Separator/Separator';
import CopyText from '../../../UI/CopyText/CopyText';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.myEmail = React.createRef();
        this.myPhone = React.createRef();
        this.state = {
            bIsHidden: true,
            phone: props.phone,
            email: props.email
        }
    }

    closeModal = () => {
        this.setState({
            bIsHidden: true
        });
    }

    toggleModal = () => {
        this.setState(prevState => {
            return {
                bIsHidden: !prevState.bIsHidden
            }
        })
    }

    render () {
        if (!this.props.contact) { return null; } // Protection
        if (!this.props.contact.phone && !this.props.contact.email) { return null; } // No need to render anything if no email and phone.
        return (
            <>
                <Modal 
                    maxWidth={500}
                    toggleModal={this.toggleModal}
                    closeModal={this.closeModal}
                    show={!this.state.bIsHidden}>
                    <h1 className={classes.Title}>Contact Information</h1>
                    <Separator />
                    {/* Phone */}
                    {this.props.contact.phone ? 
                        <div className={classes.Container}>
                            <div className={classes.Content}>
                                <div className={classes.Contact}>
                                    <SVG svg='phone' />
                                    <input 
                                        readOnly
                                        value={this.props.contact.phone} 
                                        ref={this.myPhone} 
                                        className={classes.Input} />
                                </div>
                            </div>
                            <CopyText text={'Copy phone'} 
                                copyReference={this.myPhone} />
                        </div>
                        : null}
                    {/* Email */}
                    {this.props.contact.email ? 
                        <>
                            <div className={classes.Container}>
                                <div className={classes.Content}>
                                    <div className={classes.Contact}>
                                        <SVG svg='envelope' />
                                        <input 
                                            readOnly
                                            value={this.props.contact.email} 
                                            ref={this.myEmail}
                                            className={classes.Input} />
                                    </div>
                                </div>
                                <CopyText text={'Copy email'} 
                                    copyReference={this.myEmail} />
                            </div>
                            <Separator />
                            <div className={classes.Container}>
                                <a className={classes.Email} href={['mailto:', this.props.contact.email].join('')}>
                                    <SVG svg='sent-envelope' />
                                    <span>Send an email</span>
                                </a>
                            </div>
                        </>
                        : null}
                </Modal>
                <button type="button" onClick={this.toggleModal} className={classes.Button} aria-busy="false">Contact provider</button> 
            </>
        )
    }
}

export default Contact;