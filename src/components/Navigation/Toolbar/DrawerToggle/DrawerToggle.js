import React from 'react';
// CSS
import classes from './DrawerToggle.module.css';

const drawerToggle = (props) => {
    const drawerToggleClasses = [classes.DrawerToggle, props.isOpen ? classes.Open: null];
    return (
        <div className={drawerToggleClasses.join(' ')} onClick={props.onClick}>
            <div />
        </div>
    );
}

export default drawerToggle;