import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import classes from './NagivationItem.module.css'

const navigationItem = (props) => {
    let navLinkClasses = [classes.active];
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
                {props.icon && props.link === props.location.pathname ? <img className={classes.NavigationItemIcon} src={props.icon} alt=""/> : null} {props.children}</NavLink>
        </li>
    );
}

export default withRouter(navigationItem);