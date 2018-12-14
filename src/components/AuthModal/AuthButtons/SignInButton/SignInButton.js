import React from 'react';

const signInButton = (props) => {
    return (
        <li className={props.className} 
            onClick={props.onClick}>
            <button>
                Sign in
            </button>
        </li>
    );
}

export default signInButton;