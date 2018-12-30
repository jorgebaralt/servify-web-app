import React from 'react';
// JSX
import SVG from '../../../../../SVG/SVG';

const userButton = (props) => {
    return (
        <li className={props.className} >
            <button onClick={() => console.log('User button clicked')}>
                <SVG svg='user' />
            </button>
        </li>
    );
}

export default userButton;