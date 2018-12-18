import React from 'react';
// CSS
import classes from './LoadingBounce.module.css';

const loadingBounce = (props) => {
    return (
        <div className={classes.Spinner}>
            <div style={{width: props.width, height: props.height}} className={classes.Bounce1}></div>
            <div style={{width: props.width, height: props.height}} className={classes.Bounce2}></div>
            <div style={{width: props.width, height: props.height}} className={classes.Bounce3}></div>
        </div>
    )
}

export default loadingBounce;