import React, { useContext } from 'react';
import { connect } from 'react-redux'
// CSS
import classes from './NavAuthButtons.module.css';
// JSX
import { HeaderContext } from '../../../../hoc/Layout/Header/Header';
import NavAuthButton from './NavAuthButton/NavAuthButton';

const navAuthButtons = (props) => {
    const header = useContext(HeaderContext);

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
                onClick={() => header.toggleAuthModal('sign in')}/>
            <NavAuthButton
                button='Sign up'
                className={buttonClass.join(' ')} 
                onClick={() => header.toggleAuthModal('sign up')}/>
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

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.authReducer.userId !== null
	};
};

export default connect(mapStateToProps)(navAuthButtons);