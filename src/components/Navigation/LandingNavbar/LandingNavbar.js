import React from 'react';
// CSS
import classes from '../Navbar.module.css';
// JSX
import DesktopNav from '../DesktopNav/DesktopNav';
import MobileDrawer from '../MobileDrawer/MobileDrawer';
import NagivationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../Toolbar/DrawerToggle/DrawerToggle';

const landingNavbar = (props) => {
    let navbarClasses = [classes.Navbar];
    if (props.isNavbarTransparent) {
        navbarClasses.push(classes.NavbarTransparent);
    }
    return (
        <header className={navbarClasses.join(' ')} ref={props.reference}>
            <nav onScroll={props.onScroll}>
                <DesktopNav onScroll={props.onScroll}>
                    <NagivationItems  
                        navbarType={props.navbarType} 
                        isNavbarTransparent={props.navbarTransparent} 
                        toggleAuthModal={props.toggleAuthModal} />
                </DesktopNav>
            </nav>
            <DrawerToggle 
                isOpen={props.bIsDrawerOpen}
                onClick={props.toggleMobileDrawer}/>
            <MobileDrawer
                drawerClass={classes.MobileOnly}
                isOpen={props.bIsDrawerOpen}
                onClick={props.toggleMobileDrawer}
                // NavItems props
                isNavbarTransparent={props.navbarTransparent} 
                toggleAuthModal={props.toggleAuthModal} />
        </header>
    );
}

export default React.memo(landingNavbar);