import React, { Component } from 'react';
import classes from './PostOverview.module.css';
import HeaderImage from '../../assets/images/overview.jpeg';
import Button from '../../components/UI/Button/Button';
import { One, Two, Three, Four } from '../../assets/svg/Numbers';

class PostOverview extends Component {
	render() {
		return (
			<>
				{/* Header image */}
				<div
					style={{ backgroundImage: `url(${HeaderImage})` }}
					className={classes.Header}
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
					<div className={classes.WhyDiv}>
						<h2 className={classes.WhyTitle}>Why pick Servify?</h2>
						<p className={classes.WhyText}>
							Servify allow users to post any type of service free
							of price in a simple and easy way. You have full
							control over prices and rules. 
						</p>
					</div>
					<div className={classes.WhyDiv}>
						<h2 className={classes.WhyTitle}>Why we do this?</h2>
						<p className={classes.WhyText}>
							We want to privde a platform where users can come
							and find services and an easy and friendly way. Let
							us help you grow!
						</p>
					</div>
				</div>
				{/* Steps to create a service */}

				<h1 className={classes.HowToPostTitle}>
					How to post a service
				</h1>
				<div className={classes.HowToPostContainer}>
					<div className={classes.HowToPostStep}>
						<One style={{ width: 50, height: 50 }} />
						<h2 className={classes.HowToPostStepTitle}>Create an account</h2>
						<p className={classes.HowToPostText}>Before posting a service, make sure yo create an account</p>
					</div>
					<div className={classes.HowToPostStep}>
						<Two style={{ width: 50, height: 50 }} />
						<h2 className={classes.HowToPostStepTitle}>Fill your information</h2>
						<p className={classes.HowToPostText}>Once you have an account, you will be able to post as many services as you want</p>
					</div>
					<div className={classes.HowToPostStep}>
						<Three style={{ width: 50, height: 50 }} />
						<h2 className={classes.HowToPostStepTitle}>Post your service</h2>
						<p className={classes.HowToPostText}>After filling all your information, post your service so everyone is able to look at it.</p>
					</div>
					<div className={classes.HowToPostStep}>
						<Four style={{ width: 50, height: 50 }} />
						<h2 className={classes.HowToPostStepTitle}>Get contacted for jobs</h2>
						<p className={classes.HowToPostText}>Once your service is posted, users will be able to contact you to schedule a job.</p>
					</div>
				</div>
				{/* How we display info (what clients see) */}
				{/* Client payment options */}
				{/* Our price -> Free for now */}
				{/* Company growth */}
			</>
		);
	}
}

export default PostOverview;
