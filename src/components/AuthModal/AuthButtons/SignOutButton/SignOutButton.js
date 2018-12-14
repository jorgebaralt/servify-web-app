import React from 'react';

const signOutButton = (props) => {
    return (
        <li className={props.className} 
            onClick={props.onClick}>
            <button>
                Sign out
            </button>
        </li>
    );
}

export default signOutButton;