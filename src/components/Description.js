import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Logo from '../assets/logoBorderOrange.png';
import Button from '@material-ui/core/Button';
import ScrollAnimation from 'react-animate-on-scroll';

function Description(props) {
	return (
		<div>
			<Paper style={{ paddingTop: '13%', paddingBottom: '13%' }}>
				<img src={Logo} style={{ height: 140, width: 100 }} alt={'logo'} />
				<Typography
					variant="h1"
					component="h1"
					style={{ fontSize: 50, fontWeight: 'bold', marginTop: 30 }}
				>
					Solve your house problems with <span>Servify</span>
				</Typography>
				<Typography component="p" style={{ fontSize: 28, marginTop: 15 }}>
					Easiest way to find a service in your local area.
				</Typography>
				<div style={{ marginTop: 20 }}>
					<Button
						variant="contained"
						color="primary"
						style={{ fontSize: 18, height: 50, boxShadow: '0px 0px 0px 0px' }}
					>
						Search for a service
					</Button>
					<Button
						variant="contained"
						color="default"
						style={{
							marginLeft: 10,
							fontSize: 18,
							height: 50,
							color: '#ff5722',
							backgroundColor: 'white',
							boxShadow: '0px 0px 0px 0px',
						}}
					>
						Post a service
					</Button>
					<Typography component="p" style={{ fontSize: 20, marginTop: 15 }}>
						Available in Android and iOS
					</Typography>
					<ScrollAnimation animateIn="fadeIn">
						<i className="material-icons" style={{ fontSize: 60, color: '#ff5722' }}>
							keyboard_arrow_down
					</i>
					</ScrollAnimation>
					
				</div>
			</Paper>
		</div>
	);
}

export default Description;
