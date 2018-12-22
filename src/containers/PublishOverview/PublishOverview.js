import React, { Component } from 'react';
// CSS
import classes from './PublishOverview.module.css';
// Image
import CustomersImage from '../../assets/images/happy.jpg';
// JSX
import ReadyToGrow from '../../components/Publish/ReadyToGrow/ReadyToGrow';
import SVG from '../../components/SVG/SVG';
import HeaderImage from '../../assets/images/overview.jpeg';
import ImageFadeIn from '../../components/UI/ImageFadeIn/ImageFadeIn';
import Button from '../../components/UI/Button/Button';
import Separator from '../../components/UI/Separator/Separator'
import { One, Two, Three, Four } from '../../assets/svg/Numbers';

class PublishOverview extends Component {
	state = { 
		width: window.innerWidth 
	};

	componentDidMount() {
		window.addEventListener('resize', this.handleResize);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	handleResize = () => {
		this.setState({ width: window.innerWidth });
	};

	render() {
		return (
			<>
				{/* Header image */}
				<div style={{ backgroundImage: `url(${HeaderImage})` }}
					className={classes.Header} >
					{this.state.width >= 900 ? (
						<div className={classes.Box}>
							<h1>Find new customers</h1>
							<p className={classes.Description}>
								Increase your customers by hosting your services on Servify
							</p>
							<Button className={classes.Button} blockButton={true} type={'primary'}>Post a Service</Button>
						</div>
					) : null}
				</div>
				<div className={classes.Container}>
					{this.state.width < 900 ? 
						<div className={classes.MobileBox}>
							<h1>Find new customers</h1>
							<p className={classes.Description}>
								Increase your customers by hosting your services on Servify
							</p>
							<Button className={classes.Button} blockButton={true} type={'primary'}>Post a Service</Button>
						</div>
					: null}
					{/* - why post a service  - why we are the best option*/}
					<div className={classes.WhyContainer}>
						<div className={classes.WhyDiv}>
							<h2 className={classes.SecondTitle}>
								Why choose us?
							</h2>
							<p className={classes.WhyText}>
								Servify allows users to publish any type of service <strong>free</strong> of 
								price and/or find any necessary service in a simple and easy way. You have 
								full control over prices and rules and any kind of contact with your customers.
							</p>
						</div>
						<div className={classes.WhyDiv}>
							<h2 className={classes.SecondTitle}>Our purpose</h2>
							<p className={classes.WhyText}>
								We want to provide a platform where anyone can use and find any service that might
								be needed in an easy and user-friendly way. All service providers can easily make
								their services public for anyone to see. Let us help you grow!
							</p>
						</div>
					</div>
					<Separator />
					{/* Steps to create a service */}
					<h1>How to post a service</h1>
					<div className={classes.HowToPostContainer}>
						<div className={classes.HowToPostStep}>
							<One style={{ borderRadius: '50%', width: 75, height: 75 }} />
							<h2 className={classes.SecondTitle}>
								Create an account
							</h2>
							<p className={classes.HowToPostText}>
								Before publishing a service, make sure you create an
								account with us. You can use this account for the mobile
								versions as well!
							</p>
						</div>
						<div className={classes.HowToPostStep}>
							<Two style={{ borderRadius: '50%', width: 75, height: 75 }} />
							<h2 className={classes.SecondTitle}>
								Fill your information
							</h2>
							<p className={classes.HowToPostText}>
								Once you have an account, you will be able to publish
								as many services as you want, be sure to provide as
								many details as possible to atract more customers.
							</p>
						</div>
						<div className={classes.HowToPostStep}>
							<Three style={{ borderRadius: '50%', width: 75, height: 75 }} />
							<h2 className={classes.SecondTitle}>
								Post your service
							</h2>
							<p className={classes.HowToPostText}>
								After filling all your information, post your service so 
								everyone is able to look at it, you will be able to modify
								anything at any time if you wish to.
							</p>
						</div>
						<div className={classes.HowToPostStep}>
							<Four style={{ borderRadius: '50%', width: 75, height: 75 }} />
							<h2 className={classes.SecondTitle}>
								Get contacted for jobs
							</h2>
							<p className={classes.HowToPostText}>
								Once your service is posted, users will be able to
								contact you through our app or through the to contact
								information you provided to schedule a job.
							</p>
						</div>
					</div>
					{/* How we display info (what clients see) */}
					<Separator />
					<h1>What your customers will see</h1>
					<div className={classes.WhatUsersSeeContainer}>
						<div className={classes.WhatUsersSeeImgContainer}>
							<ImageFadeIn
								draggable='false'
								className={classes.WhatUsersSeeImg}
								src={CustomersImage}
								alt='' />
						</div>
						<div className={classes.WhatUsersSeeDescriptionContainer}>
							<ul className={classes.ListContainer}>
								<li className={classes.ListItem}>
									<SVG svg='checkmark-nobg' />
									<span>Reviews and rating of your service</span>
								</li>
								<li className={classes.ListItem}>
									<SVG svg='checkmark-nobg' />
									<span>Service category and price rating</span>
								</li>
								<li className={classes.ListItem}>
									<SVG svg='checkmark-nobg' />
									<span>Your contact information</span>
								</li>
								<li className={classes.ListItem}>
									<SVG svg='checkmark-nobg' />
									<span>Location displayed in a map</span>
								</li>
								<li className={classes.ListItem}>
									<SVG svg='checkmark-nobg' />
									<span>Information about you and the service</span>
								</li>
								<li className={classes.ListItem}>
									<SVG svg='checkmark-nobg' />
									<span>Easy way to contact you</span>
								</li>
								<li className={classes.ListItem}>
									<SVG svg='checkmark-nobg' />
									<span>Option to add to favorites</span>
								</li>
							</ul>
						</div>
					</div>
					{/* TODO Client payment options */}
					{/* TODO Company growth */}
				</div>
				<ReadyToGrow />
			</>
		);
	}
}

export default PublishOverview;
