import React from 'react';
import typing from '../../../assets/svg/typing.svg';
import classes from './TypingDots.module.css';

const TypingDots = ( props ) => {
	return (
		<div className={classes.TypingDots}>
			<img
				style={{
					width: props.width, 
					height: props.height
				}}
				src={typing}
				alt=''
			/>
		</div>
	);
};

export default TypingDots;
