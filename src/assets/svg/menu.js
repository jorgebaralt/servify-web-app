


import React from 'react';

const share = (props) => {
    return (
        <svg 
            x="0px" 
            y="0px" 
            viewBox="0 0 53 53" 
            style={{enableBackground: 'new 0 0 53 53'}}
            width={props.width ? props.width: '38px'}
            height={props.height ? props.height: '38px'}
            className={props.className}>
            <path d="M2,13.5h49c1.104,0,2-0.896,2-2s-0.896-2-2-2H2c-1.104,0-2,0.896-2,2S0.896,13.5,2,13.5z" fill="#ff7043" />
            <path d="M2,28.5h49c1.104,0,2-0.896,2-2s-0.896-2-2-2H2c-1.104,0-2,0.896-2,2S0.896,28.5,2,28.5z" fill="#ff7043" />
            <path d="M2,43.5h49c1.104,0,2-0.896,2-2s-0.896-2-2-2H2c-1.104,0-2,0.896-2,2S0.896,43.5,2,43.5z" fill="#ff7043" />
        </svg>
    );
}

export default share;