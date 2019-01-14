import React from 'react';
// CSS
import classes from './OrSeparator.module.css';

const orSeparator = () => {
    return (
        <div className={classes.SeparatorWrapper}>
            <div className={classes.SeparatorContainer}>
                <div className={classes.Line} />
                <span className={classes.Option}>or</span>
            </div>
        </div>
    );
}

export default orSeparator;