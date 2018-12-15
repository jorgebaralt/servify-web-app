import React from 'react';
// CSS
import classes from './NavAuthButtons.module.css';
// JSX
import NavAuthButton from './NavAuthButton/NavAuthButton';

const navAuthButtons = (props) => {
	let buttonClass = [classes.Button];
	//if white respective css
	if (props.color === 'white') {
		buttonClass.push(classes.ButtonWhite);
	}
	// // If transparent use respective CSS
	// let buttonClasses = [];
	// if (props.isNavbarTransparent) {
	// 	buttonClasses.push(classes.Transparent);
    // }
    return (
        <>
            <NavAuthButton
                button='Sign out'
                className={buttonClass.join(' ')} 
                onClick={props.toggleAuthModal}/>
            <NavAuthButton
                button='Sign in'
                className={buttonClass.join(' ')} 
                onClick={props.toggleAuthModal}/>
            <NavAuthButton
                button='Sign up'
                className={buttonClass.join(' ')} 
                onClick={props.toggleAuthModal}/>
        </>
    );
}

export default navAuthButtons;