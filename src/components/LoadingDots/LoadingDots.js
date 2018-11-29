import React from 'react';
import loading from '../../assets/svg/loading.svg';
import classes from './LoadingDots.module.css';

const LoadingDots = ( props ) => {
	return (
		<div className={classes.LoadingDots}>
			<img
				style={{
					width: props.width, 
					height: props.height
				}}
				src={loading}
				alt=''
			/>
		</div>
	);
};

export default LoadingDots;
