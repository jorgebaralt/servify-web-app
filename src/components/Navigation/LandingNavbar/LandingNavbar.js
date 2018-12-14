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
    return (
        <header className={navbarClasses.join(' ')} ref={props.reference}>
            <nav className={classes.DesktopOnly} onScroll={props.onScroll}>
                <NagivationItems  navbarType={props.navbarType} isNavbarTransparent={props.navbarTransparent} toggleAuthModal={props.toggleAuthModal} />
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