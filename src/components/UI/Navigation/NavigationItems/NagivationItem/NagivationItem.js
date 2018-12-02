import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import classes from './NagivationItem.module.css'

const navigationItem = (props) => {
    // If the navlink is active use the respective CSS
    let navLinkClasses = [classes.active];
    // If transparent use respective CSS
    if (props.isNavbarTransparent) {
        navLinkClasses.push(classes.Transparent)
    }
    return (
        <li className={classes.NavigationItem}>
            <NavLink
                activeClassName={navLinkClasses.join(' ')}
                exact={props.exact}
                to={props.link}
                onClick={props.clicked}>
                {/* If the NavLink has an icon prop then render it */}
                {props.icon && props.link === props.location.pathname ? <img className={classes.NavigationItemIcon} src={props.icon} alt=""/> : null} {props.children}</NavLink>
        </li>
    );
}

export default withRouter(navigationItem);