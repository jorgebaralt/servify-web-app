import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import classes from './NagivationItem.module.css';

const navigationItem = (props) => {
	let navItemClass = [classes.NavigationItem];
	//if white respective css
	if (props.color === 'white') {
		navItemClass.push(classes.NavigationItemWhite);
	}
	// If transparent use respective CSS
	if (props.isNavbarTransparent) {
		navItemClass.push(classes.Transparent);
	}

	return (
		<li className={navItemClass.join(' ')}>
			<NavLink
				className={props.className} // Desktop only
				exact={props.exact}
				to={props.link}
				onClick={props.clicked}>
				{/* If the NavLink has an icon prop then render it */}
				{props.icon && props.link === props.location.pathname ? (
					<img className={classes.NavigationItemIcon} src={props.icon} alt="" />
				) : null}
				{props.children}
			</NavLink>
		</li>
	);
};

export default withRouter(navigationItem);
