import React from 'react';

import classes from './SideDrawer.module.css';

import Backdrop from '../../Backdrop/Backdrop'
import Logo from '../../../UI/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawerWrapper, classes.Close];
    if (props.isOpen) {
        attachedClasses = [classes.SideDrawerWrapper, classes.Open];
    }
    return (
        <>  
            <Backdrop 
                show={props.isOpen} 
                clicked={props.click}

                />
            <div 
                // onTouchStart={props.click}
                className={attachedClasses.join(' ')}>
                <div className={classes.SideDrawerContainer}>
                    <div className={classes.Logo}>
                        <Logo />
                    </div>
                    <nav>
                        <NavigationItems 
                        clicked={props.click} 
                        />
                    </nav>
                </div>
            </div>
        </>
    );
}

export default sideDrawer;