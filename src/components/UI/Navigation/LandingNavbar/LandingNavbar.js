import React from 'react';
// CSS
import classes from './LandingNavbar.module.css';
// JSX
import SideDrawer from '../SideDrawer/SideDrawer';
import NagivationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../Toolbar/DrawerToggle/DrawerToggle';

const landingNavbar = (props) => {
    let navbarClasses = [classes.Navbar];
    if (props.isNavbarTransparent) {
        navbarClasses.push(classes.NavbarTransparent);
    }
    console.log(props.isNavbarTransparent)
    return (
        <header className={navbarClasses.join(' ')} ref={props.reference}>
            <nav className={classes.DesktopOnly} onScroll={props.onScroll}>
                <NagivationItems isNavbarTransparent={props.navbarTransparent}/>
            </nav>
            <DrawerToggle 
                drawerClass={classes.MobileOnly}
                isOpen={props.isDrawerOpen}
                click={props.sideDrawerToggleClick}/>
            <SideDrawer 
                drawerClass={classes.MobileOnly}
                isOpen={props.isDrawerOpen}
                click={props.sideDrawerToggleClick}/>
        </header>
    );
}

export default landingNavbar;