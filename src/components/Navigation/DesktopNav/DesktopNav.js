import React from 'react';
// CSS
import classes from './DesktopNav.module.css';

const desktopNav = (props) => {
    return (
        <div className={classes.DesktopOnly} onScroll={props.onScroll}>
            {props.children}
        </div>
    );
}

export default desktopNav;