import React, { Component } from 'react';
import classes from './PostOverview.module.css';
import HeaderImage from '../../assets/images/overview.jpeg';
import Button from '../../components/UI/Button/Button';

class PostOverview extends Component {
	render() {
		return (
			<>
				{/* Header image */}
				<div
					className={classes.Header}
					style={{ backgroundImage: `url(${HeaderImage})` }}
				>
					<div className={classes.Box}>
						<h1>Find new customers</h1>
						<p className={classes.Description}>
							Get found by people who need your services
						</p>
						<Button type="primary" style={{ width: '100%' }}>
							Create a Service
						</Button>
					</div>
				</div>
				{/* - why post a service  - why we are the best option*/}
				<div className={classes.WhyContainer}>
					<div className={classes.WhyText}>
						<h2>Why pick Servify?</h2>
					</div>
					<div className={classes.WhyText}>
						<h2>Why we do this?</h2>
					</div>
				</div>
				{/* Steps to create a service */}
				{/* How we display info (what clients see) */}
				{/* Client payment options */}
				{/* Our price -> Free for now */}
				{/* Company growth */}
			</>
		);
	}
}

export default PostOverview;
