import React from 'react';
// CSS
import classes from './PostInfoNavbar.module.css';
// JSX 
import NavigationItems from '../NavigationItems/NavigationItems';

const PostInfoNavbar = (props) => {
	return (
		<header className={classes.Navbar}>
			<nav ref={props.reference}>
				<NavigationItems navbarType={props.navbarType} />
			</nav>
		</header>
	)
}

export default PostInfoNavbar;