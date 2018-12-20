import React from 'react';
// CSS
import classes from './Separator.module.css';

const separator = () => {
    console.log('ping')
    return (
        <li className={classes.Separator}>
            <hr />
        </li>
    );
}

export default separator;