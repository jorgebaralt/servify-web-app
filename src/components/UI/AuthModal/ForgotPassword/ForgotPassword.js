import React from 'react';
// CSS
import classes from './ForgotPassword.module.css';

const forgotPassword = () => {
    return (
        <div className={classes.ForgotPasswordContainer}>
            <button type="button" 
                className={classes.ForgotPassword} 
                aria-busy="false">Forgot password</button>
        </div>
    );
}

export default forgotPassword;