import React from 'react';
// CSS
import classes from './SearchNavbar.module.css';
// JSX 
import NavigationItems from '../NavigationItems/NavigationItems';

const searchNavbar = (props) => {
	return (
		<header className={classes.Navbar}>
			<nav ref={props.reference}>
				<NavigationItems className={classes.DesktopOnly} navbarType={props.navbarType} />
			</nav>
		</header>
	)
}

export default searchNavbar;