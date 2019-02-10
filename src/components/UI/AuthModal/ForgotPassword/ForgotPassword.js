import React from 'react';
// CSS
import classes from './ForgotPassword.module.css';

const forgotPassword = (props) => {
    return (
        <div className={classes.ForgotPasswordContainer}>
            <button 
                onClick={props.onClick}
                type="button" 
                className={classes.ForgotPassword} 
                aria-busy="false">Forgot password</button>
        </div>
    );
}

export default forgotPassword;