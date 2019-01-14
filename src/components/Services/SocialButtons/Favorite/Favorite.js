import React from 'react';
// CSS
import classes from './Favorite.module.css';
// JSX
import SVG from '../../../SVG/SVG';

const favorite = () => {
    return (
        <button className={classes.Button}>
            <SVG svg='favorite' />
        </button>
    )
}

export default favorite;