import React from 'react';
// CSS
import classes from './Button.module.css';

// TODO Refactor ButtonFilled and Button into one

const button = (props) => {

    // Success/Danger classes
    let buttonClass = [props.className];
    buttonClass.push(classes.Button);
    if (props.type === 'success') {
        buttonClass.push(classes.Success);
    }
    if (props.type === 'danger') {
        buttonClass.push(classes.Danger);
    }
    if (props.type === 'primary') {
        buttonClass.push(classes.Primary)
    }
    if (props.type === 'default') {
        buttonClass.push(classes.Default)
    }
    return (
        <button
            style={props.style}
            className={buttonClass.join(' ')}
            type={props.type}
            disabled={props.disabled}
            onClick={props.clicked}>{props.children}</button>
    );
}

export default button;