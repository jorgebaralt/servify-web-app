import React from 'react';

import classes from './Button.module.css';

const button = (props) => {

    // Success/Danger classes
    let buttonClass = [props.class]
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