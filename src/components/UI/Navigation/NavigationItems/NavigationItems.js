import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
// CSS
import classes from './NavigationItems.module.css';
// JSX
import NavigationItem from './NagivationItem/NagivationItem.js';
import ButtonFilled from '../../ButtonFilled/ButtonFilled';
// Logo
import servifyLogo from '../../../../assets/images/servify-logo-96x96.png';

const renderNavigationItems = (props) => {
	switch (props.location.pathname) {
		case '/':
			return (
				<>
					<div className={classes.Spacing} />
					<NavigationItem {...props} link="/post/overview" color="white">
						Post a service
					</NavigationItem>
					<NavigationItem {...props} link="/help" color="white">
						Help
					</NavigationItem>
					<NavigationItem {...props} link="/signup" color="white">
						Sign up
					</NavigationItem>
					<NavigationItem {...props} link="/login" color="white">
						Sign in
					</NavigationItem>
				</>
			);
		case '/post/overview':
			return (
				<>
					<div className={classes.SpacingSmall} />
					<NavigationItem {...props} link="/post/overview">
						Overview
					</NavigationItem>
					<NavigationItem {...props} link="/help">
						Create a service
					</NavigationItem>
					<NavigationItem {...props} link="/signup">
						FAQ
					</NavigationItem>
					<div className={classes.Spacing} />
					<div className={classes.Navtext}>Ready to grow?</div>
					<ButtonFilled style={{ width: 'auto' }} type="primary">
						Get started
					</ButtonFilled>
					<div className={classes.SpacingSmall}/>
				</>
			);

		default:
	}
};
const nagivationItems = (props) => {
	return (
		<ul className={classes.NavigationItems}>
			<div className={classes.SpacingSmall} />
			<NavLink className={classes.NavbarLogo} to ="/">
				<img src={servifyLogo} alt="" />
			</NavLink>
			{renderNavigationItems(props)}
			<div className={classes.SpacingSmall} />
		</ul>
	);
};

export default withRouter(nagivationItems);
