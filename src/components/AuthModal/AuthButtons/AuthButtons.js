import React from 'react';
// CSS
import classes from './AuthButton.module.css';
// JSX
import SignOutButton from './SignOutButton/SignOutButton';
import SignUpButton from './SignUpButton/SignUpButton';

const authButton = (props) => {
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
            <SignOutButton 
                className={buttonClass.join(' ')} 
                onClick={props.toggleAuthModal}
                color={props.color} />
            <SignUpButton 
                className={buttonClass.join(' ')} 
                onClick={props.toggleAuthModal}
                color={props.color} />
        </>
    );
}

export default authButton;