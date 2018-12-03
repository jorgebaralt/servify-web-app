import React from 'react';
import classes from './ButtonFillled.module.css';

const ButtonFillled = (props) => {
	let buttonClass = [props.class];
	buttonClass.push(classes.ButtonFilled);
	if (props.type === 'success') {
		buttonClass.push(classes.Success);
	}
	if (props.type === 'danger') {
		buttonClass.push(classes.Danger);
	}
	if (props.type === 'primary') {
		buttonClass.push(classes.Primary);
	}
	return (
		<button
			style={props.style}
			type={props.type}
			className={buttonClass.join(' ')}
			disabled={props.disabled}
			onClick={props.clicked}
		>
			{props.children}
		</button>
	);
};
export default ButtonFillled;
