import React from 'react';
// CSS
import classes from './Button.module.css';
// JSX
import SVG from '../../SVG/SVG';

const button = (props) => {
    // Success/Danger classes
    let logo = null;
    let children = props.children;
    const buttonClass = [props.className];
    buttonClass.push(classes.Button);
    switch (props.type) {
        case 'success':
            buttonClass.push(classes.Success);
            break;
        case 'danger':
            buttonClass.push(classes.Danger);
            break;
        case 'primary':
            buttonClass.push(classes.Primary);
            break;
        case 'default':
            buttonClass.push(classes.Default);
            break;
        case 'facebook':
            logo = <span className={classes.Logo}><SVG svg='facebook-nobg'/></span>
            buttonClass.push(classes.Facebook);
            break;
        case 'google':
            logo = <span style={{backgroundColor: '#FFF', padding: '2px', borderRadius: '50%'}} className={classes.Logo}><SVG svg='google-nobg'/></span>
            buttonClass.push(classes.Google);
            break;
        case 'applestore':
            logo = <span className={classes.AppLogo}><SVG svg='applestore'/></span>
            buttonClass.push(classes.Applestore);
            children = (
                <div className={classes.Appstore}>
                    <div className={classes.Download}>Download on the</div>
                    <div className={classes.Store}>App Store</div>
                </div>
            );
            break;
        case 'playstore':
            logo = <span className={classes.AppLogo}><SVG svg='playstore'/></span>
            buttonClass.push(classes.Playstore);
            children = (
                <div className={classes.Appstore}>
                    <div className={classes.Download}>Get it on</div>
                    <div className={classes.Store}>Google Play</div>
                </div>
            );
            break;
        case 'auth':
            buttonClass.push(classes.Auth);
            break;
        default:
            buttonClass.push(classes.Default);
            // do nothing
    }
    if (props.blockButton) {
        buttonClass.push(classes.BlockButton);
    }
    return (
        <button
            style={props.style}
            tabIndex={props.tabIndex}
            className={buttonClass.join(' ')}
            type={props.submit ? 'submit' : 'button'}
            disabled={props.disabled}
            onClick={props.clicked}>{logo}{children}</button>
    );
}

export default button;