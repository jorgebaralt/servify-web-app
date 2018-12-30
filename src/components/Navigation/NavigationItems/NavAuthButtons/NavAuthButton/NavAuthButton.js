import React from 'react';
// JSX
import SVG from '../../../../SVG/SVG';

const AuthButton = (props) => {
    return (
        <li className={props.className} >
            <button onClick={() => props.onClick(props.button.toLowerCase())}>
                {props.button}
            </button>
        </li>
    );
}

const UserButton = (props) => {
    return (
        <li className={props.className} >
            <button onClick={() => console.log('User button clicked')}>
                <SVG svg='user' />
            </button>
        </li>
    );
}

const navAuthButton = (props) => {
    return (
        props.button === 'User' ?
            <UserButton {...props} />
            : <AuthButton {...props} />
    );
}

export default navAuthButton;