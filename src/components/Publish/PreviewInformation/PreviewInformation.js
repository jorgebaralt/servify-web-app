import React from 'react';
// CSS
import classes from './PreviewInformation.module.css';

const previewInformation = (props) => {
    if (!props.children) { return null; } // Render null if no children passed
    return (
        <div className={classes.Wrapper}>
            <div className={classes.Title}>
                {props.title}
            </div>
            <div className={classes.Container}>
                {props.children}
            </div>
        </div>
    );
}

export default previewInformation;