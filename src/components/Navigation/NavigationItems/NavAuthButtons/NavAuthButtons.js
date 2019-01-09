import React from 'react';
// CSS
import classes from './NavAuthButtons.module.css';
// JSX
import NavAuthButton from './NavAuthButton/NavAuthButton';

const navAuthButtons = (props) => {
    console.log('props.isAuthenticated', props.isAuthenticated)
	const buttonClass = [classes.Button];
	//if white respective css
	if (props.color === 'white') {
		buttonClass.push(classes.ButtonWhite);
    }
    let authButtons = (
        <>
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
    if (props.isAuthenticated) { 
        authButtons = (
            <NavAuthButton
                width={props.width}
                button='User'
                className={buttonClass.join(' ')} 
                onClick={props.onClick}/>
        );
    }
    return (
        authButtons
    );
}

export default navAuthButtons;