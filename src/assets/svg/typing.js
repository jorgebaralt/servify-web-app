import React from 'react';

const typing = (props) => {
	return (
        <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="xMidYMid" 
        className={props.className}
        style={props.style}
        width={props.width ? props.width : "80px"} 
        height={props.height ? props.height : "80px"} >
            <circle cx="24.5" cy="62.5" r="6" fill="#e15b64">
                <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="62.5;37.5;62.5;62.5" keyTimes="0;0.25;0.5;1" dur="1s" begin="-0.5s"/>
            </circle>
            <circle cx="41.5" cy="62.5" r="6" fill="#f47e60">
                <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="62.5;37.5;62.5;62.5" keyTimes="0;0.25;0.5;1" dur="1s" begin="-0.375s"/>
            </circle>
            <circle cx="58.5" cy="62.5" r="6" fill="#f8b26a">
                <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="62.5;37.5;62.5;62.5" keyTimes="0;0.25;0.5;1" dur="1s" begin="-0.25s"/>
            </circle>
            <circle cx="75.5" cy="53.0362" r="6" fill="#abbd81">
                <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="62.5;37.5;62.5;62.5" keyTimes="0;0.25;0.5;1" dur="1s" begin="-0.125s"/>
            </circle>
        </svg>
    );
};

export default typing;