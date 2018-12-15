import React from 'react';
// CSS
import classes from './PublishNavbar.module.css';
// JSX 
import NavigationItems from '../NavigationItems/NavigationItems';

const publishNavbar = (props) => {
	return (
		<header className={classes.Navbar}>
			<nav ref={props.reference}>
				<NavigationItems 
                    navbarType={props.navbarType} 
                    isNavbarTransparent={props.navbarTransparent} 
                    toggleAuthModal={props.toggleAuthModal} />
			</nav>
		</header>
	)
}

export default publishNavbar;