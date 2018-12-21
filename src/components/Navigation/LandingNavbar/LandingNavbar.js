import React from 'react';
// CSS
import classes from './LandingNavbar.module.css';
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
                drawerClass={classes.MobileOnly}
                isOpen={props.bIsDrawerOpen}
                click={props.MobileDrawerToggleClick}/>
            
            <MobileDrawer 
                drawerClass={classes.MobileOnly}
                isOpen={props.bIsDrawerOpen}
                click={props.MobileDrawerToggleClick}>
                <NagivationItems  
                    navbarType='MobileDrawer' 
                    isNavbarTransparent={props.navbarTransparent} 
                    toggleAuthModal={props.toggleAuthModal} />
            </MobileDrawer>
        </header>
    );
}

export default React.memo(landingNavbar);