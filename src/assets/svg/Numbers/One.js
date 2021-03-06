import React from 'react';

export const One = (props) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 512 512"
			width="32px" 
			height="32px"
			{...props}
		>
			<path
				d="M409.6-328.089c0-25.134-20.378-45.511-45.511-45.511H45.511C20.378-373.6,0-353.222,0-328.089 V-9.511C0,15.622,20.378,36,45.511,36h318.578C389.222,36,409.6,15.622,409.6-9.511V-328.089z"
				fill="#ff7043"
				transform="matrix(1.25 0 0 -1.25 0 45)"
			/>
			<path
				d="M187.301-91.147h-20.81c-16.93,0-23.996,12.345-23.996,24.337 c0,12.356,8.818,24.348,23.996,24.348h50.085c15.178,0,23.643-10.934,23.643-25.042v-200.738 c0-17.647-11.287-27.511-26.465-27.511c-15.167,0-26.453,9.865-26.453,27.511V-91.147z"
				fill="#fff"
				transform="matrix(1.25 0 0 -1.25 0 45)"
			/>
		</svg>
	);
};

