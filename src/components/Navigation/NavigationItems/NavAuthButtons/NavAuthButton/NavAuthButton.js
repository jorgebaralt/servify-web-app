import React from 'react';

const navAuthButton = (props) => {
    return (
        <li className={props.className} >
            <button onClick={() => props.onClick(props.button.toLowerCase())}>
                {props.button}
            </button>
        </li>
    );
}

export default navAuthButton;