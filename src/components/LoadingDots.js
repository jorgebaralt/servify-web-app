import React from 'react';
import loading from '../assets/svg/loading.svg';

const LoadingDots = ({ style }) => {
	return (
		<img
			style={style}
			src={loading}
			alt=""
		/>
	);
};
export default LoadingDots
