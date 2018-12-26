import React from 'react';
// JSX
import SVG from '../../../../SVG/SVG';

const navAuthButton = (props) => {
    return (
        <li className={props.className} >
            <button onClick={() => props.onClick(props.button.toLowerCase())}>
                {props.button === 'User' ? <SVG svg='user' /> : props.button}
            </button>
        </li>
    );
}

export default navAuthButton;