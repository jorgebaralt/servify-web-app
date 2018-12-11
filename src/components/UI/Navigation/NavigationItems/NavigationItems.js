import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
// CSS
import classes from './NavigationItems.module.css';
// JSX
import NavigationItem from './NagivationItem/NagivationItem.js';
import ButtonFilled from '../../ButtonFilled/ButtonFilled';
// Logo
import servifyLogo from '../../../../assets/images/servify-logo-96x96.png';
import SearchBar from '../SearchBar/SearchBar';

const renderNavigationItems = (props) => {
	switch (props.navbarType) {
		case 'LandingNavbar':
			return (
				<>
					<div className={classes.Spacing} />
					<NavigationItem {...props} link="/post/overview" color="white">
						Post
					</NavigationItem>
					<NavigationItem {...props} link="/services" color="white">
						Services
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
		case 'PostInfoNavbar':
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
		case 'SearchNavbar':
			return (
				<>
					<SearchBar />
					<div className={classes.Spacing} />
					<NavigationItem className={props.className} {...props} link="/post/overview" >
						Post
					</NavigationItem>
					<NavigationItem className={props.className} {...props} link="/help" >
						Help
					</NavigationItem>
					<NavigationItem className={props.className} {...props} link="/signup" >
						Sign up
					</NavigationItem>
					<NavigationItem className={props.className} {...props} link="/login" >
						Sign in
					</NavigationItem>
				</>
			);
		default:
			return (
				<>
					<div className={classes.Spacing} />
					<NavigationItem {...props} link="/" color="white" >
						No navigation items found
					</NavigationItem>
					<NavigationItem {...props} link="/" >
						No navigation items found
					</NavigationItem>
				</>
			);
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
		</ul>
	);
};

export default withRouter(nagivationItems);
