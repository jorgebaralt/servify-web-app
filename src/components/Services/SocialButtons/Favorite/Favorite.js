import React from 'react';
// CSS
import classes from './Favorite.module.css';
// JSX
import SVG from '../../../SVG/SVG';

const favorite = (props) => {
    return (
        <button onClick={props.onClick} className={classes.Button}>
            <SVG className={classes.Favorite} fill={props.fill ? '#D75A4A' : 'transparent'} svg='favorite' />
        </button>
    );
}

export default favorite;