import React from 'react';
// CSS
import classes from './Button.module.css';
// JSX
import SVG from '../../SVG/SVG';

// TODO Refactor ButtonFilled and Button into one

const button = (props) => {
    // Success/Danger classes
    let logo = null;
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
            buttonClass.push(classes.Primary)
            break;
        case 'default':
            buttonClass.push(classes.Default)
            break;
        case 'facebook':
            logo = <span className={classes.Logo}><SVG svg='facebook-nobg'/></span>
            buttonClass.push(classes.Facebook)
            break;
        case 'google':
            logo = <span style={{backgroundColor: '#FFF', padding: '2px', borderRadius: '50%'}} className={classes.Logo}><SVG svg='google-nobg'/></span>
            buttonClass.push(classes.Google)
            break;
        case 'auth':
            buttonClass.push(classes.Auth)
            break;
        default:
            buttonClass.push(classes.Default)
            // do nothing
    }
    if (props.blockButton) {
        buttonClass.push(classes.BlockButton);
    }
    return (
        <button
            style={props.style}
            className={buttonClass.join(' ')}
            type={props.submit ? 'submit' : 'button'}
            disabled={props.disabled}
            onClick={props.clicked}>{logo}{props.children}</button>
    );
}

export default button;