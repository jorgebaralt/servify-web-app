import React from 'react';
// CSS
import classes from './Panel.module.css';

const panel = (props) => {
    return (
        <div className={classes.Panel}>
            <div style={props.bold ? {fontWeight: 600} : null} className={classes.Header}>
                <span>{props.header}</span>
            </div>
            <div className={classes.Body}>
                {props.children}
            </div>
        </div>
    );
}

export default panel;