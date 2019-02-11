import React, { useState, useRef } from 'react';
// CSS
import classes from './Contact.module.css';
// JSX
import Modal from 'react-png-modal';
import SVG from '../../../SVG/SVG';
import Separator from '../../../UI/Separator/Separator';
import CopyText from '../../../UI/CopyText/CopyText';

const contact = (props) => {
    const [bIsHidden, setIsHidden] = useState(true);
    const myPhone = useRef(null);
    const myEmail = useRef(null);

    const toggleModal = () => {
        setIsHidden(!bIsHidden);
    }

    const closeModal = () => {
        setIsHidden(true);
    }

    if (!props.contact) { return null; } // Protection
    if (!props.contact.phone && !props.contact.email) { return null; } // No need to render anything if no email and phone.
    return (
        <>
            <Modal 
                maxWidth={500}
                closeModal={closeModal}
                show={!bIsHidden}>
                <div className={classes.Wrapper}>
                    <h1 className={classes.Title}>Contact Information</h1>
                    <Separator />
                    {/* Phone */}
                    {props.contact.phone ? 
                        <div className={classes.Container}>
                            <div className={classes.Content}>
                                <div className={classes.Contact}>
                                    <SVG svg='phone' />
                                    <input 
                                        readOnly
                                        value={props.contact.phone} 
                                        ref={myPhone} 
                                        className={classes.Input} />
                                </div>
                            </div>
                            <CopyText text={'Copy phone'} 
                                copyReference={myPhone} />
                        </div>
                        : null}
                    {/* Email */}
                    {props.contact.email ? 
                        <>
                            <div className={classes.Container}>
                                <div className={classes.Content}>
                                    <div className={classes.Contact}>
                                        <SVG svg='envelope' />
                                        <input 
                                            readOnly
                                            value={props.contact.email} 
                                            ref={myEmail}
                                            className={classes.Input} />
                                    </div>
                                </div>
                                <CopyText text={'Copy email'} 
                                    copyReference={myEmail} />
                            </div>
                            <Separator />
                            <div className={classes.Container}>
                                <a className={classes.Email} href={['mailto:', props.contact.email].join('')}>
                                    <SVG svg='sent-envelope' />
                                    <span>Send an email</span>
                                </a>
                            </div>
                        </>
                        : null}
                </div>
            </Modal>
            <button type="button" onClick={toggleModal} className={classes.Button} aria-busy="false">Contact provider</button> 
        </>
    );
}

export default contact;