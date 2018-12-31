import React from 'react';
// JSX
import AuthButton from './AuthButton/AuthButton';
import UserAuthButton from './UserAuthButton/UserAuthButton';

const navAuthButton = (props) => {
    console.log(props)
    return (
        props.button === 'User' ?
            <UserAuthButton {...props} />
            : <AuthButton {...props} />
    );
}

export default navAuthButton;