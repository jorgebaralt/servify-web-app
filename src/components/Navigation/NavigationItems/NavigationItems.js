import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
// CSS
import classes from './NavigationItems.module.css';
// JSX
import NavigationItem from './NagivationItem/NagivationItem';
import ButtonFilled from '../../UI/ButtonFilled/ButtonFilled';
import NavAuthButtons from './NavAuthButtons/NavAuthButtons'
import Separator from './Separator/Separator';
// Logo
import servifyLogo from '../../../assets/images/servify-logo-96x96.png';
import SearchBar from '../SearchBar/SearchBar';

const renderNavigationItems = (props) => {
	switch (props.navbarType) {
		case 'LandingNavbar':
			return (
				<>
					<div className={classes.Spacing} />
					<Separator />
					<NavigationItem {...props} link="/publish/overview" color="white">
						Publish
					</NavigationItem>
					<NavigationItem {...props} link="/services" color="white">
						Services
					</NavigationItem>
					<NavigationItem {...props} link="/help" color="white">
						Help
					</NavigationItem>
					<Separator />
					<NavAuthButtons {...props} color="white"/>
				</>
			);
		case 'PublishNavbar':
			return (
				<>
					<div className={classes.SpacingSmall} />
					<NavigationItem {...props} link="/publish/overview">
						Overview
					</NavigationItem>
					<NavigationItem {...props} link="/help">
						Publish
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
					<NavigationItem className={props.className} {...props} link="/publish/overview" >
						Publish
					</NavigationItem>
					<NavigationItem className={props.className} {...props} link="/help" >
						Help
					</NavigationItem>
					<NavAuthButtons {...props} />
				</>
			);
		default:
			return (
				<>
					<div className={classes.Spacing} />
					<NavigationItem {...props} link="/publish/overview" color="white">
						Publish
					</NavigationItem>
					<NavigationItem {...props} link="/services" color="white">
						Services
					</NavigationItem>
					<NavigationItem {...props} link="/help" color="white">
						Help
					</NavigationItem>
					<NavAuthButtons {...props} color="white"/>
				</>
			);
	}
};
const nagivationItems = (props) => {
	return (
		<>
			<ul className={classes.NavigationItems}>
				<div className={classes.SpacingSmall} />
				<NavLink className={classes.NavbarLogo} to ="/">
					<img src={servifyLogo} alt="" />
				</NavLink>
				{renderNavigationItems(props)}
			</ul>
		</>
	);
};

export default withRouter(nagivationItems);
