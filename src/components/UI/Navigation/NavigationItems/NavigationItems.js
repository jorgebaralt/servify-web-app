import React from 'react';
// CSS
import classes from './NavigationItems.module.css';
// JSX
import NavigationItem from './NagivationItem/NagivationItem.js';
// Logo
import servifyLogo from '../../../../assets/images/servify-logo-96x96.png';

const nagivationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <div className={classes.NavbarLogo}>
                <img src={servifyLogo} alt='' />
            </div>
            <div className={classes.Spacing}></div>
            <NavigationItem {...props} link='/host'>Become a host</NavigationItem>
            <NavigationItem {...props} link='/help'>Help</NavigationItem>
            <NavigationItem {...props} link='/signup'>Sign up</NavigationItem>
            <NavigationItem {...props} link='/login'>Sign in</NavigationItem>
        </ul>
    )
}

export default nagivationItems;