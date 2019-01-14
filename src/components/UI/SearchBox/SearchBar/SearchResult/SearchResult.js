import React from 'react';
// CSS
import classes from './SearchResult.module.css'
// JSX
import { Link } from 'react-router-dom';

const searchResult = (props) => {
    return (
        <Link 
            to='/'
            /**
            * onMouseDown event fires before onBlur event on input. It calls event.preventDefault() to
            * prevent onBlur from being called, and doesn't prevent the navLink click from happening, 
            * this guarantees that the NavLink will redirect on click without having to use SetTimeout 
            * or any other hack.
                */
            onMouseDown={event => event.preventDefault()}>
            <li aria-selected="false" 
                id="Result__option__option-0" 
                role="option" 
                className={classes.ResultWrapper}>
                    <div className={classes.PinWrapper}>
                        <span className={classes.Pin} role='img' aria-label='service' aria-hidden="true">&#x2699;</span>
                    </div>
                    <div className={classes.ResultContainer}>
                        <div className={classes.ResultService}>{props.service}</div>
                        <div className={classes.ResultLocation}>{props.location}</div>
                    </div>
            </li>
        </Link>
    );
}

export default searchResult;