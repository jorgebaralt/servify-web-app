import React from 'react';
// CSS
import classes from './NavAuthButtons.module.css';
// JSX
import NavAuthButton from './NavAuthButton/NavAuthButton';

const navAuthButtons = (props) => {
	const buttonClass = [classes.Button];
	//if white respective css
	if (props.color === 'white') {
		buttonClass.push(classes.ButtonWhite);
	}
    return (
        <>
            <NavAuthButton
                button='Sign in'
                className={buttonClass.join(' ')} 
                onClick={props.toggleAuthModal}/>
            <NavAuthButton
                button='Sign up'
                className={buttonClass.join(' ')} 
                onClick={props.toggleAuthModal}/>
            <NavAuthButton
                width={props.width}
                button='User'
                className={buttonClass.join(' ')} 
                onClick={props.onClick}/>
        </>
    );
}

export default navAuthButtons;