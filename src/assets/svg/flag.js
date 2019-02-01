import React from 'react';

const flag = (props) => {
    return (
        <svg 
            viewBox="0 0 512 512" 
            className={props.className}
            style={{enableBackground: 'new 0 0 512 512'}}
            width={props.width ? props.width : "12px"} 
            height={props.height ? props.height : "12px"}>
            <path d="m376 120v257c0 16.871094-5.601562 32.457031-15.039062 45h151.039062v-302zm0 0" fill="#585858" />
            <path d="m0 0h60v512h-60zm0 0" fill="#585858" />
            <path d="m301 332h-45v45c0 24.75 20.25 45 45 45s45-20.25 45-45-20.25-45-45-45zm0 0" fill="#585858" />
            <path d="m301 30h-211v15.714844c59.984375 70.09375 59.984375 170.476562 0 240.570312v15.714844h211c16.871094 0 32.457031 5.601562 45 15.039062v-242.039062c0-24.75-20.25-45-45-45zm0 0" fill="#585858" />
        </svg>
    );
}

export default flag;