import React from 'react';

const signUpButton = (props) => {
    return (
        <li className={props.className} 
            onClick={props.onClick}>
            <button>
                Sign in
            </button>
        </li>
    );
}

export default signUpButton;