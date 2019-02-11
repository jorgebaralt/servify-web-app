import React from 'react';
// CSS
import classes from './Share.module.css';
// React Share
// Buttons
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    RedditShareButton,
    EmailShareButton,
    TelegramShareButton
} from 'react-share';
// Icons
import {
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    LinkedinIcon,
    RedditIcon,
    EmailIcon,
    TelegramIcon
} from 'react-share';
// JSX
import Modal from 'react-png-modal';
import SVG from '../../../SVG/SVG';

const share = (props) => {
    return (
        <div className={classes.Wrapper}>
            <button onClick={props.onClick} className={classes.Toggle}>
                <SVG svg='share' />
            </button>
            <Modal closeModal={props.closeModal} 
                show={!props.bIsModalHidden}>
                <h2 className={classes.Header}>Share on social media:</h2>
                <div className={classes.Container}>
                    <FacebookShareButton 
                        url={window.location.href}
                        quote={['Servify',props.title].join(' - ')}
                        className={classes.Button}>
                        <FacebookIcon
                            size={38}
                            round />
                    </FacebookShareButton>
                    <TwitterShareButton
                        url={window.location.href}
                        quote={['Servify',props.title].join(' - ')}
                        className={classes.Button}>
                        <TwitterIcon
                            size={38}
                            round />
                    </TwitterShareButton>
                    <TelegramShareButton
                        url={window.location.href}
                        quote={['Servify',props.title].join(' - ')}
                        separator=":: "
                        className={classes.Button}>
                        <TelegramIcon size={38} round />
                    </TelegramShareButton>
                    <WhatsappShareButton
                        url={window.location.href}
                        quote={['Servify',props.title].join(' - ')}
                        separator=":: "
                        className={classes.Button}>
                        <WhatsappIcon size={38} round />
                    </WhatsappShareButton>
                </div>
                <div className={classes.Container}>
                    <RedditShareButton
                        url={window.location.href}
                        quote={['Servify',props.title].join(' - ')}
                        separator=":: "
                        className={classes.Button}>
                        <RedditIcon size={38} round />
                    </RedditShareButton>
                    <LinkedinShareButton
                        url={window.location.href}
                        quote={['Servify',props.title].join(' - ')}
                        separator=":: "
                        className={classes.Button}>
                        <LinkedinIcon size={38} round />
                    </LinkedinShareButton>
                    <EmailShareButton
                        url={window.location.href}
                        quote={['Servify',props.title].join(' - ')}
                        separator=":: "
                        className={classes.Button}>
                        <EmailIcon size={38} round />
                    </EmailShareButton>
                </div>
            </Modal>
        </div>
    )
}

export default share;