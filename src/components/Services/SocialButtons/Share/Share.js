import React from 'react';
// CSS
import classes from './Share.module.css';
// JSX
import SVG from '../../../SVG/SVG';

const share = () => {
    return (
        <div className={classes.Container}>
            <button className={classes.Button}>
                <SVG svg='share' />
            </button>
        </div>
    )
}

export default share;