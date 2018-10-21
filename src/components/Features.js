import React from 'react';
import Paper from '@material-ui/core/Paper';
import Logo from '../assets/logoBorderOrange.png';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Post from '../assets/Post.jpeg';
import Review from '../assets/Review.jpeg';
import Favorite from '../assets/Favorite.jpeg';
import Browse from '../assets/browse.JPG';
import ScrollAnimation from 'react-animate-on-scroll';

function Features(props) {
	return (
		<div>
			<Paper
				style={{
					paddingTop: 50,
					paddingBottom: 100,
					paddingLeft: '15%',
					paddingRight: '15%',
					backgroundColor: '#FFCCBC',
				}}
			>
				<Typography component="h1" style={{ fontSize: 34, marginBottom: 20 }}>
					Features
				</Typography>

				<ScrollAnimation animateIn="fadeIn" animateOnce={true}>
					<Grid container spacing={30}>
						<Grid item sm={6} xs={12}>
							<Typography
								component="h1"
								style={{ fontSize: 26, fontWeight: 'bold' }}
							>
								Search for a service
								<Typography
									component="p"
									style={{
										fontSize: 20,
										textAlign: 'left',
										alignContent: 'center',
										marginTop: 10,
									}}
								>
									Users are avaible to narrow their search down by using a
									search bar, and going to the category where they need help.
									going directly to the category will show all the services
									sorted by distance. Users are also able to contact the owner
									of the service, look at the reviews, and set up the best time
									to solve their issue.
								</Typography>
							</Typography>
						</Grid>
						<Grid item sm={6} xs={12}>
							<img
								src={Browse}
								style={{ height: 500, width: 250, marginTop: '5%' }}
								alt={'logo'}
							/>
						</Grid>
					</Grid>
				</ScrollAnimation>

				<ScrollAnimation animateIn="fadeIn" animateOnce={true}>
					<Grid container spacing={30}>
						<Grid item sm={6} xs={12} style={{ marginTop: '5%' }}>
							<Typography
								component="h1"
								style={{ fontSize: 26, fontWeight: 'bold' }}
							>
								Add to favorites
								<Typography
									component="p"
									style={{
										fontSize: 20,
										textAlign: 'left',
										alignContent: 'center',
										marginTop: 10,
									}}
								>
									if you find a service that you would like to access later
									(without having to look it up all over again), or a service
									that you used and want to keep for future reference, users can
									click on the top right heart icon and save it to their
									favorites.
								</Typography>
							</Typography>
						</Grid>
						<Grid item sm={6} xs={12} style={{ marginTop: '5%' }}>
							<img
								src={Favorite}
								style={{ height: 150, width: 300 }}
								alt={'logo'}
							/>
						</Grid>
					</Grid>
				</ScrollAnimation>
				<ScrollAnimation animateIn="fadeIn" animateOnce={true}>
					<Grid container spacing={30}>
						<Grid item sm={6} xs={12} style={{ marginTop: '5%' }}>
							<Typography
								component="h1"
								style={{ fontSize: 26, fontWeight: 'bold' }}
							>
								Post a service
								<Typography
									component="p"
									style={{
										fontSize: 20,
										textAlign: 'left',
										alignContent: 'center',
										marginTop: 10,
									}}
								>
									Users can go to the post tab on the mobile app and add service
									to help the community. By just filling out the form, the
									service will be created and available for everyone to see.
								</Typography>
							</Typography>
						</Grid>
						<Grid item sm={6} xs={12} style={{ marginTop: '5%' }}>
							<img
								src={Post}
								style={{ height: 500, width: 250 }}
								alt={'logo'}
							/>
						</Grid>
					</Grid>
				</ScrollAnimation>
				<ScrollAnimation animateIn="fadeIn" animateOnce={true}>
					<Grid container spacing={30}>
						<Grid item sm={6} xs={12} style={{ marginTop: '5%' }}>
							<Typography
								component="h1"
								style={{ fontSize: 26, fontWeight: 'bold', marginTop: '5%' }}
							>
								Add reviews
								<Typography
									component="p"
									style={{
										fontSize: 20,
										textAlign: 'left',
										alignContent: 'center',
										marginTop: 10,
									}}
								>
									Reviews are essential when looking for a service. Users are
									able to read and write reviews to a service. Users are only
									allow to delete their own reviews.
								</Typography>
							</Typography>
						</Grid>
						<Grid item sm={6} xs={12} style={{ marginTop: '5%' }}>
							<img
								src={Review}
								style={{ height: 150, width: 300 }}
								alt={'logo'}
							/>
						</Grid>
					</Grid>
				</ScrollAnimation>
			</Paper>
		</div>
	);
}

export default Features;
