import React from 'react';
// CSS
import classes from './AuthModalSwitch.module.css';

const authModalSwitch = (props) => {
    return (
        <div className={classes.AuthModalSwitchWrapper}>
            <div className={classes.AuthModalSwitchContainer}>
                <span className={classes.Text}>{props.text}</span>
                <span onClick={() => props.switchAuthModalHandler(props.modalToSwitch)} className={classes.Switch}>{props.switchText}!</span>
            </div>
        </div>
    );
}

export default authModalSwitch;