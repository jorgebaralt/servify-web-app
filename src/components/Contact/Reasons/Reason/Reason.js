import React from 'react';
// CSS
import classes from './Reason.module.css';
// JSX
import SVG from '../../../../components/SVG/SVG';

const reason = (props) => {
    return (
        <div onClick={props.toggleIsReasonSelected} className={classes.ReasonContainer}>
            <div className={classes.Reason}>
                <SVG svg={props.svg} />
                <div className={classes.Description}>
                    <span>{props.text}</span>
                </div>
            </div>
        </div>
    );
}

export default reason;