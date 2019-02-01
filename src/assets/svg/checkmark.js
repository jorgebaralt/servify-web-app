import React from 'react';

const checkmark = (props) => {
	return (
    <svg 
      viewBox="0 0 44 44" 
      enableBackground="new 0 0 44 44"
      className={props.class}
      style={props.style}
      width={props.width ? props.width : "20px"} 
      height={props.height ? props.height : "20px"} >
      <path d="m22,0c-12.2,0-22,9.8-22,22s9.8,22 22,22 22-9.8 22-22-9.8-22-22-22zm12.7,15.1l0,0-16,16.6c-0.2,0.2-0.4,0.3-0.7,0.3-0.3,0-0.6-0.1-0.7-0.3l-7.8-8.4-.2-.2c-0.2-0.2-0.3-0.5-0.3-0.7s0.1-0.5 0.3-0.7l1.4-1.4c0.4-0.4 1-0.4 1.4,0l.1,.1 5.5,5.9c0.2,0.2 0.5,0.2 0.7,0l13.4-13.9h0.1c0.4-0.4 1-0.4 1.4,0l1.4,1.4c0.4,0.3 0.4,0.9 0,1.3z" fill="#FFFFFF"/>
    </svg>
  );
};

export default checkmark;
